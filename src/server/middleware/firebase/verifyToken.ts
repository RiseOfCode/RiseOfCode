import { NextFunction, Request, Response } from 'express';

const html = `
<html>
    <head lang="ru">
        <meta charset="utf-8">
        <title>Rise of Code</title>
        <meta name="description" content="" />
        <style>
        </style>
    </head>
    <body>
        <script type="module">
            import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
            const firebaseConfig = {
                apiKey: "AIzaSyDmDemNRKbp7EwtCy2n8AWqjm1qUyZ2QxA",
                authDomain: "riseofcode-7dbd1.firebaseapp.com",
                projectId: "riseofcode-7dbd1",
                storageBucket: "riseofcode-7dbd1.appspot.com",
                messagingSenderId: "165586231091",
                appId: "1:165586231091:web:ff89dd54aea980d8b2a846"
            };
            const app = initializeApp(firebaseConfig);
        </script>
    </body>
</html>
`;
