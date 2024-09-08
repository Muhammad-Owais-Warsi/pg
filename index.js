const express = require("express");
const {Client} = require('pg');

const app = express();

const client = new Client({
    user: 'test1',
    host: 'localhost',
    database: 'test1',
    password: 'test1',
    port: 5432, // default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");

        const CreateTableQuery = `
        CREATE TABLE IF NOT EXISTS test1_table 
        (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
        `;

        client.query(CreateTableQuery)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })








        // Check if the table exists
        const tableName = 'test1_table'; // Replace with your table name

        const query = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = $1
            );
        `;

        // Execute the query
        client.query(query, [tableName], (err, res) => {
            if (err) {
                console.error('Error checking table existence:', err);
            } else {
                if (res.rows[0].exists) {
                    console.log(`Table "${tableName}" exists.`);
                } else {
                    console.log(`Table "${tableName}" does not exist.`);
                }
            }
            // Close the connection after query
            client.end();
        });
    })
    .catch(err => {
        console.error('Connection error:', err.stack);
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
