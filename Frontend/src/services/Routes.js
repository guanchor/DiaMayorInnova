const routes = {
    classGroups: {
        url: "/class_groups/:id",
    },
    schoolCenters: {
        url: "/school_centers",
    },
    another: { //Just as Example, now you can use wildcards in routes
        url: "/api/another/:id",
    }
}

export default routes;