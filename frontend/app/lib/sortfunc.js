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

export { tag_sort, post_sort_like_count };
