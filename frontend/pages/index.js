import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/home.module.css';

export default function Home() {

  const router = useRouter();
  
  const [query, setQuery] = useState("");
  const [restrict, setRestrict] = useState("");
  // const [vegetarian, setVegetarian] = useState(false);
  // const [vegan, setVegan] = useState(false);
  // const [gluten, setGluten] = useState(false);
  // const [lactose, setLactose] = useState(false);
  const [mincal, setMinCal] = useState(-1);
  const [maxcal, setMaxCal] = useState(-1);

  function handleSearch() {

    // let restrictions = restrict.replace(",", " ");
    // if (vegetarian)
    //   restrictions += " vegetarian";
    // if (vegan)
    //   restrictions += " vegan";
    // if (gluten)
    //   restrictions += " gluten";
    // if (lactose)
    //   restrictions += " lactose";

    router.push({
      pathname: '/search',
      query: { 
        query: query,
        restrict: restrict.replace(",", " "),
        mincal: mincal,
        maxcal: maxcal,
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

          <Row className={["mb-3", styles.form_row].join(" ")}>
            <Form.Group>
              <Form.Control type="input" placeholder="Search" onChange = { (e) => setQuery(e.target.value) }/>
            </Form.Group>
          </Row>

          {/* <Row className={["mb-3", styles.form_row].join(" ")}>
            <Form.Group>
              <Form.Check type="checkbox" inline="true" label="Veg." onChange = { (e) => setVegetarian(!vegetarian) }/>
              <Form.Check type="checkbox" inline="true" label="Vegan" onChange = { (e) => setVegan(!vegan) }/>
              <Form.Check type="checkbox" inline="true" label="Gluten-Free" onChange = { (e) => setGluten(!gluten) }/>
              <Form.Check type="checkbox" inline="true" label="Lactose Intolerance" onChange = { (e) => setLactose(!lactose) }/>
            </Form.Group>
          </Row> */}

          <Row className={["mb-3", styles.form_row].join(" ")}>
            <Form.Group>
              <Form.Control type="input" placeholder="Ingredients to Exclude" onChange = { (e) => setRestrict(e.target.value) }/>
            </Form.Group>
          </Row>

          <Row className={["mb-3", styles.form_row].join(" ")}>
            <Form.Group as={Col}>
              <Form.Control type="input" className={styles.mincal} placeholder="Minimum Calories"onChange = { (e) => setMinCal(e.target.value) }/>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Control type="input" className={styles.maxcal} placeholder="Maximum Calories" onChange = { (e) => setMaxCal(e.target.value) }/>
            </Form.Group>
          </Row>
                      
          <Button type="button" variant="primary" className={styles.search_btn} onClick={handleSearch}>Search</Button>
        </Form>
      </main>
    </div>
  )
}
