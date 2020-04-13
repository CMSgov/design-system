# CMSDS Design Assets

In this folder you will find the following

- CMSDS Sketch file
- CMSDS fonts (Bitter, Icons, and Open Sans)

To update the Sketch library version create a pull request with the following: 

1. Update the CMSDS Sketch file
1. Update the .xml file in the following ways
    - Update the item `title` with the version number
        - Example: `CMS Design System UI kit - v1.1`
    - Update `pubDate` using [RFC822 format](https://hackage.haskell.org/package/time-http-0.5/docs/Data-Time-Format-RFC822.html)
        - Example: `Mon, 13 Apr 2020 15:11:00`
    - Update `enclosure sparkle:version` number
        - Example: `sparkle:version="1.1"`
