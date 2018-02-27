const config = {
    siteName: 'Aha! Event',
    siteUrl: 'https://ahaevent.org',
    siteAuthor: 'Nirmankarta',
    siteTagline: 'Showcasing FLOSS events, one at a time',
    siteKeywords: 'AhaEvents, Technology, Tech events, open source',
    siteDescription: 'Showcasing events, one at a time',
    defaultOgImage: 'img/defaultOgImage.png',

    menu: [
        {
            key: "info",
            icon: "info-circle-o",
            link: "/"
        },
        {
            key: "slack",
            icon: "slack",
            link: "https://slack.nirmankarta.com",
            newTab: true
        },
        {
            key: "github",
            icon: "github",
            link: "https://github.com/nirmankarta/ahaevent",
            newTab: true
        },
        {
            key: "home",
            icon: "home",
            link: "/"
        }
    ],

    gaTrackingId: 'UA-67526856-8'
};
 
export default config;
