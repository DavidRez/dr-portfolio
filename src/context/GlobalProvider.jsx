import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalProvider = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [color, setColor] = useState('#27353d');
  const changeColor = (clr = '#27353d') => setColor(clr);

  useEffect(() => {
    console.log("******call******");
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
                            },
                            frameworks
                        }
                    }
                }
            `,
            }),
          }
        );

        const result = await response.json();
        const global = {
          home: result.data.home,
          work: result.data.work,
          navigation: result.data.navigations,
        };
        setData(global);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const value = { data, loading, error, color, changeColor };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
