import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useQuery } from '../lib/useQuery';
import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import styles from '../styles/search.module.css';

function useQuery() {
  const router = useRouter();
  const hasQueryParams = /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
  const ready = !hasQueryParams || Object.keys(router.query).length > 0;
  if (!ready) return null;
  return router.query;
}

function recipeInfo(time, cals) {
  if (time && cals)
    return time + "| " + cals + " cals";
  if (time)
    return time;
  if (cals && cals > 0)
    return cals + " cals";
  return "";
}

export default function Search() {
  
  const [recipes, setRecipes] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  const query = useQuery();

  useEffect(() => {

    if (!query) return;

    let search = 'http://localhost:8983/solr/recipes/select?q=';

    if (query.query) {
        for (const term of query.query.split(" "))
          search += "%2B" + term;
    }

    if (query.restrict) {
        for (const ingredient of query.restrict.split(" "))
          search += "&fq=%2Dingredients:" + ingredient;
    }

    if (query.maxcal > 0 && query.mincal > 0)
      search += "&fq=calories:%5B" + query.mincal + " TO " + query.maxcal + "%5D";
    else if (query.maxcal > 0)
      search += "&fq=calories:%5B0 TO " + query.maxcal + "%5D";
    else if (query.mincal > 0)
      search += "&fq=calories:%5B" + query.mincal + " TO %2A%5D";
    
    console.log(search);
    fetch(search)
      .then(response => response.json())
      .then(data => setRecipes(data["response"]["docs"]));

  }, [query]);

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
                  <h1 className={styles.recipe_title}>
                    {recipe.title}
                  </h1>
                  <p className={styles.recipe_info}>
                    {recipeInfo(recipe.time, recipe.calories)}
                  </p>
                </a>
              </div>
            )
          }
          <div className={styles.footer}>
            <Link href="/">
              <a>Search Again</a>
            </Link>
          </div>
        </div>

        {/* <Button type="button" variant="primary" onClick={(e)=>setShowModal(true)}>Open Modal</Button>
        <Modal onClose={(e)=>setShowModal(false)} show={showModal}>Hello World!</Modal> */}
    </>
  );
}