#### 이런 스타일로 입고 싶은데 내가 가지고 있는걸로는 어떻게 입을 수 있을까?
#### input: 원하는 스타일 및 가지고 있는 상품종류 -> ex) 스포티 / 카라티
#### output 이미지 / 추가 착용아이템 리스트  -> ex) 대표이미지 / 오픈넥셔츠 숏팬츠
#### 무신사 대표적인 스타일을 보여주는 스탭 스냅 사이트를 크롤링한다.
#### 1차 수집 : http://www.musinsa.com/index.php?m=street&_mon=&p=1#listStart에 들어있는 모든 url을 수집한다.
#### 2차 수집 수집한 url에서 원하는 정보를 추출한다 태그 / 스타일 / 날짜

### 시간상 32000개의 데이터 중 2000개만 수집

import sys
import io
# sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
# sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')
import odbc
import time

from datetime import datetime
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

try:
    import urllib.request as urllib2
except ImportError:
    import urllib2

#### DB 연결하는 방식으로 했습니다,
connect = odbc.odbc('first')
db = connect.cursor()

def login_musinsa(dri):
    dri.implicitly_wait(3)   # 암묵적으로 웹 자원 로드를 위해 3초까지 기다려 준다.
    url="https://www.musinsa.com/?mod=login&referer=http%3A%2F%2Fstore.musinsa.com%2Fapp%2F"
    dri.get(url)   # url에 접근한다.
    dri.find_element_by_name("id").send_keys("wjdgkals23")
    dri.find_element_by_name("pw").send_keys("bn150525268b")
    dri.find_element_by_xpath("/html/body/div[1]/div[2]/form/span[3]/input").send_keys(Keys.ENTER)

def parse_url(dri,num):
    link_list = []
    for i in range(0,num):
        s = str(i)
        print(s)
        link = "http://www.musinsa.com/index.php?m=street&_mon=&p="+s+"#listStart"
        req = urllib2.urlopen(link)
        soup = BeautifulSoup(req, 'html.parser')
        f_div = soup.find("div","boxed-list-wrapper")
        f_ul = f_div.find("ul","snap-article-list boxed-article-list article-list center list")
        f_li_list = f_ul.find_all("li","listItem")
        for li in f_li_list:
            s_div = li.find("div","articleImg")
            href = s_div.find("a")['href']
            link_list.append("http://www.musinsa.com" + href)
    return link_list

def crawl_each(dri, urls, db):
    info_list = []
    for url in urls:
        print(url)
#         req = urllib2.urlopen(url)
        dri.get(url)
        soup = BeautifulSoup(dri.page_source, 'html.parser')
        div = soup.find("div", "snapInfo")
        div_table = div.find("table")
        trs = div_table.find_all("tr")
        page_dict = {}
        tag_sentence = ""
        gender = ""
        style = ""
        for tr in trs:
            th = tr.find("th").text
            th = th.strip()
            if(th == "태그"):
                td = tr.find("td")
                ul = td.find("ul")
                lis = ul.find_all("li")
                cnt = 0
                for li in lis:
                    cnt=cnt+1
                    if(cnt!=len(lis)):
                        span = li.find("span")
                        if(span.text == "남자" or span.text == "여자"):
                            gender = span.text
                        else:
#                             print(span.text)
                            if(span.text.strip() is ""):
                                pass
                            else:
                                db.execute("INSERT into first.clothing_tag (name) VALUES ('%s')" % (span.text))
                    else:
                        pass
            elif(th == "스타일"):
                td = tr.find("td")
                span = td.find("span")
                style = span.text
                db.execute("INSERT into first.style_tag (name) VALUES ('%s')" % (style))
            else:
                cnt = 1
#             if(style != "" and tag_sentence != "" and gender != ""):
# #                 page_dict['style'] = style
# #                 page_dict['tag'] = tag_sentence
# #                 page_dict['gender'] = gender
# #                 page_dict['url'] = url
#                 db.execute("INSERT into first.musinsa_info (style, tags, gender, url) VALUES ('%s','%s','%s', '%s')" % (style, tag_sentence, gender, url))
#                 info_list.append(page_dict)

driver = webdriver.Chrome("C:\chromedriver\chromedriver")
login_musinsa(driver)
url_link = parse_url(driver, 1) # 30 페이지 url 수집 (30*60 = 1800개 정보 수집)
info_list = crawl_each(driver, url_link, db)
