import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/home.module.css';

export default function Home() {

  const router = useRouter();
  
  const [query, setQuery] = useState("");
  const [restrict, setRestrict] = useState("");
  // const [vegetarian, setVegetarian] = useState(false);
  // const [vegan, setVegan] = useState(false);
  // const [gluten, setGluten] = useState(false);
  // const [lactose, setLactose] = useState(false);
  // const [mincal, setMinCal] = useState(-1);
  // const [maxcal, setMaxCal] = useState(-1);

  function handleSearch() {

    // let restrictions = restrict;
    // if (vegetarian)
    //   restrictions += "+vegetarian";
    // if (vegan)
    //   restrictions += "+vegan";
    // if (gluten)
    //   restrictions += "+gluten";
    // if (lactose)
    //   restrictions += "+lactose";

    router.push({
      pathname: '/search',
      query: { 
        query: query,
        restrict: restrict.replace(",", " "),
        // mincal: mincal,
        // maxcal: maxcal,
      },
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DietMeals</title>
        <meta name="description" content="Easily find healthy recipes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h1 className={styles.title}>
          <span className={styles.diet}>Diet</span>
          <span className={styles.meals}>Meals</span>
        </h1>

        <p className={styles.description}>
          Easily find healthy recipes!
        </p>

        <Form className={styles.form}>

          <Form.Group className={["mb-3", styles.form_input].join(" ")}>
            <Form.Control 
              type="input" 
              placeholder="Search" 
              onChange = { (e) => setQuery(e.target.value) }
            />
          </Form.Group>

          {/* <Form.Group className={["mb-3", styles.form_radios].join(" ")}>
            <Form.Check 
              type="checkbox" 
              label="Veg." 
              inline="true"
              onChange = { (e) => setVegetarian(!vegetarian) }
            />
            <Form.Check 
              type="checkbox" 
              label="Vegan" 
              inline="true"
              onChange = { (e) => setVegan(!vegan) }
            />
            <Form.Check 
              type="checkbox" 
              label="Gluten-Free" 
              inline="true" 
              onChange = { (e) => setGluten(!gluten) }
            />
            <Form.Check 
              type="checkbox" 
              label="Lactose Intolerance" 
              inline="true" 
              onChange = { (e) => setLactose(!lactose) }
            />
          </Form.Group> */}

          <Form.Group className={["mb-3", styles.form_input].join(" ")}>
            <Form.Control 
              type="input" 
              placeholder="Ingredients to Exclude"
              onChange = { (e) => setRestrict(e.target.value) }
            />
            <Form.Text className="text-muted">
              Enter commas between each excluded ingredient
            </Form.Text>
          </Form.Group>

          {/* <Form.Group className={["mb-3", styles.form_input].join(" ")}>
             <Form.Control 
              type="input" 
              placeholder="Minimum Calories"
              onChange = { (e) => setMinCal(e.target.value) }
              className={styles.calories}
            />
            <Form.Control 
              type="input" 
              placeholder="Maximum Calories"
              onChange = { (e) => setMaxCal(e.target.value) }
              className={styles.calories}
            />
          </Form.Group> */}

          <Button 
            type="button" 
            variant="primary"
            className={styles.search_btn} 
            onClick={handleSearch}>
              Search
          </Button>
        </Form>
      </main>
    </div>
  )
}
