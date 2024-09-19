import { KrThing } from "krakenthing";
import { krakenComponents } from "./src/krakenComponents/krakenComponents.js";

//

async function test() {
                  
                  let thing = new KrThing("ItemList");

                  thing.p.add("name", "List 1");

                  thing.list.add({
                                    "@context": "https://schema.org/",
                                    "@type": "Thing",
                                    "@id": "thing1",
                                    name: "thing1",
                  });

                  thing.list.add({
                                    "@context": "https://schema.org/",
                                    "@type": "Thing",
                                    "@id": "thing2",
                                    name: "thing2",
                  });

                  thing.list.add({
                                    "@context": "https://schema.org/",
                                    "@type": "Thing",
                                    "@id": "thing3",
                                    name: "thing3",
                  });

                  let actionRecord = {
                                    "@type": "Action",
                                    "@id": "action1",
                                    name: "action1",
                                    url: "https://www.test.com/action1",
                                    image: {
                                                      "@context": "https://schema.org/",
                                                      "@type": "ImageObject",
                                                      "@id": "image1",
                                                      name: "image_1",
                                                      contentUrl: "https://placehold.co/600x400",
                                    },
                  };

                  thing.p.set("potentialAction", actionRecord);

                  thing.api.apiUrl = 'https://data.krknapi.com'
                  thing.api.apiBasePath = '/api'
                  thing.api.apiCollection = 'testComponent'
                  //let r = await thing.api.post()
                  //console.log(r)

                  //

                  let actionMenu1 = document.getElementById("actionMenu1");
                  actionMenu1.thing = thing;

                  //
                  let list1 = document.getElementById("list1");
                  list1.thing = thing;

                  let card1 = document.getElementById("card1");
                  card1.thing = thing;

                  let testReplace = document.getElementById("testReplace");
                  let testReplaceObject = new krakenComponents.base(
                                    testReplace,
                  );
                  testReplaceObject.thing = thing;
                  testReplaceObject.redraw();
}

test()

//
