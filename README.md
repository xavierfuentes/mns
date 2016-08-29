## Quick start

It requires `NodeJs >= 6`

```
git clone https://github.com/xavifuefer/mns.git
npm install
npm run client:dev
```

Open a browser tab and navigate to (http://localhost:8080/)[http://localhost:8080/] 

## Description

Task: Create a grid using no JavaScript frameworks or libraries. The grid should
get its data from the provided JSON file `data.json`, and display all the
provided data.

If you have difficulty reading out the JSON file, you may copy/paste the JSON
data to your code for usage.

The view should adapt to the range of sizes our designer has specified - large,
medium, and narrow - and have UX considerations for each of those sizes. See
below example of what it should look like (Note, the asterisk denotes a
promotion):

## Large screen

This is for screens greater than 768px.

```
+--------+-------+-------+
| Title* | Price | Stars |
+--------+-------+-------+
```

## Medium screen

This is for screens greater than 320px and equal to or smaller to 768px.

```
+--------+-------+
| Title* | Price |
+--------+-------+
| Stars          |
+----------------+
```

## Narrow screen

This is for screens 320px wide and smaller.


```
+--------+
| Title* |
+--------+
| Price  |
+--------+
| Stars  |
+--------+
```

## Features:

- Sorting by title and price (ASC/DESC)
- Filtering by title
- The last sorted field should persist when page is refreshed
