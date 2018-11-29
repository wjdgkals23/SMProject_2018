let tag_sort = function(a,b) {
    if(a.name > b.name)
        return 1;
    else
        return -1;
};

export { tag_sort };
