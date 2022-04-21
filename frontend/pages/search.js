import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useQuery } from '../lib/useQuery';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../styles/search.module.css';

function useQuery() {
  const router = useRouter();
  const hasQueryParams = /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
  const ready = !hasQueryParams || Object.keys(router.query).length > 0;
  if (!ready) return null;
  return router.query;
}

export default function Search() {
  
  const [recipes, setRecipes] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  const query = useQuery();

  useEffect(() => {
    if (!query) return;
    console.log(query);
    let search = 'http://localhost:8983/solr/recipes/select?q=';
    // search += "\\\"" + query.query.replace("+", "%2B")  + "\\\"";
    if (query.query) {
        for (const term of query.query.split(" "))
          search += "%2B" + term;
    }
    if (query.restrict) {
        for (const ingredient of query.restrict.split(" "))
          search += "&fq=%2Dingredients:" + ingredient;
    }
    // let search = "http://localhost:8983/solr/recipes/select?q=\\\"chocolate\\\""
    console.log(search);
    fetch(search)
      .then(response => response.json())
      .then(data => setRecipes(data["response"]["docs"]));
  }, [query]);

  // useEffect(() => {
  //   const { query } = useRouter();
  //   console.log(query);
  //   // let search = "\"" + query.query.replace(" ", "%2B")  + "\""
  //   // // let restrict = "%2Dingredients:flour"
  //   // fetch('http://localhost:8983/solr/recipes/select?q=' + search)
  //   //   .then(response => response.json())
  //   //   .then(data => setRecipes(data["response"]["docs"]));
  // }, []);

  return (
    <>
        <div className={styles.results}>
          {
            recipes.map((recipe) => 
              <div className={styles.recipe}>
                <a href={recipe.url}>
                  <Image
                    priority
                    src={"/logo.svg"}
                    className={styles.borderCircle}
                    height={144}
                    width={144}
                    alt={recipe.title}
                  />
                  <h1>
                    {recipe.title}
                  </h1>
                  <p>
                    {recipe.time}| {recipe.calories} cals
                  </p>
                </a>
              </div>
            )
          }
          <div className={styles.footer}>
            <Link href="/">
              {/* <a>← Search Again</a> */}
              <a>Search Again</a>
            </Link>
          </div>
        </div>

        {/* <p>{data}</p> */}
        {/* <Button 
          type="button"
          variant="primary"
          onClick={(e)=>setShowModal(true)}
          >
          Open Modal
        </Button>
        <Modal onClose={(e)=>setShowModal(false)} show={showModal}>
          Hello World!
        </Modal> */}
    </>
  );
}