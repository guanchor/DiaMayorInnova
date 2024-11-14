const routes = {
    classGroups:{
        url: "/class_groups/:id",
    },
    items:{
        url: "/api/items.json",
        options: {},
        get: {
            url: "/api/items.json"
        }
    },
    another:{ //Just as Example, now you can use wildcards in routes
        url: "/api/another/:id",
    }
}

export default routes;