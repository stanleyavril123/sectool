import express from "express";
import fetch from "node-fetch"; // Import node-fetch for HTTP requests

const router = express.Router();

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].username == obj.username && list[i].password == obj.password) {
            return true;
        }
    }

    return false;
}

function getUsers() {
    return [   
        {
            "username": "John",
            "password": "hello"
        }
    ]
}

/*
TODO : setup login, sign in, logout routers
*/

router.post("/login", async (req, res) => {
    try {
        console.log("Requested: ", req.body);
        console.log("Found users", getUsers())
        if (containsObject(req.body, getUsers())) {
            res.json({ success: true })
        }   
        else{
            res.status(401).json({ success: false, message: "An error occurred" });
        }
    }
    catch {
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

router.post("/sign-up", async (req, res) => {
    try {

    }
    catch {
        
    }
});

// check HTTP method
router.delete("/logout", async (req, res) => {
    try {

    }
    catch {
        
    }
});

export default router;