require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log('NODE_ENV', process.env.NODE_ENV);
    
module.exports = {
  siteMetadata: {
    title: `PFG Optics`,
    description: `PFG Website`,
    author: `Brendan Darnell`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Montserrat Condensed:400,700,900', 'Open Sans']
        }
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
