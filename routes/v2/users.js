const express = require('express');
const router = express.Router();

// Implementando versionamento
router.get('/', (req, res) => {
    res.json({ message: "Version 2 of the Users API." });
});

module.exports = router;