const fetchData = async () => {
  try {
    const response = await fetch(
      `https://us-west-2.cdn.hygraph.com/content/cm98ifkkg00p507waihhn7lep/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                  query {
                      navigations (
                      where: { 
                          OR: [
                          {navId: "primary"},
                          {navId: "secondary"}
                          ] 
                      }
                      ) {
                      navId,
                      link (where: {label_not: ""}) {
                          label,
                          path,
                          external
                      }
                      }
                      home (where: {slug: "home"}) {
                      title,
                      header,
                      content {
                          text
                      }
                      },
                      work (where: {slug: "work"}) {
                      singleWork {
                          title,
                          description,
                          hasVideo,
                          video {
                          url,
                          mimeType
                          }
                          image {
                          url,
                          mimeType
                          },
                          lightBg {
                          hex
                          },
                          darkBg {
                          hex
                          }
                      }
                  }
              }
          `,
        }),
      }
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    return error;
  } finally {
    return true;
  }
};

export default fetchData;
