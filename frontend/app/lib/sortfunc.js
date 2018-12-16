let tag_sort = function(a,b) {
    if(a.name > b.name)
        return 1;
    else
        return -1;
};

let post_sort_like_count = function(a,b) {
    if(a.like_count > b.like_count)
        return -1;
    else
        return 1;
}

let comment_sort_date = function(a,b) {
    if(a.updated_time > b.updated_time)
        return -1;
    else
        return 1;
}

export { tag_sort, post_sort_like_count, comment_sort_date };
