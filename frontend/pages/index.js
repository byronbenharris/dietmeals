import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/home.module.css'

export default function Home() {
  const router = useRouter();

  function handleSearch() {
    router.push({
      pathname: '/search',
      query: { 
        find: 'FIND',
        ignore: 'IGNORE',
      },
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DietMeals</title>
        <meta name="description" content="Find recipes that you can eat!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h1 className={styles.title}>

          <span className={styles.diet}>Diet</span>
          <span className={styles.meals}>Meals</span>
        </h1>

        <p className={styles.description}>
          Find recipes that you can eat!
        </p>

        <Form className={styles.form}>

          <Form.Group className={["mb-3", styles.form_input].join(" ")}>
            <Form.Control type="input" placeholder="Search" />
          </Form.Group>

          <Form.Group className={["mb-3", styles.form_radios].join(" ")}>
            <Form.Check type="checkbox" label="Veg." inline="true" />
            <Form.Check type="checkbox" label="Vegan" inline="true" />
            <Form.Check type="checkbox" label="Gluten-Free" inline="true" />
            <Form.Check type="checkbox" label="Lactose Intolerance" inline="true" />
          </Form.Group>

          <Form.Group className={["mb-3", styles.form_input].join(" ")}>
            <Form.Control type="input" placeholder="Custom Exclusions" />
            <Form.Text className="text-muted">
              Enter commas between each excluded ingredient
            </Form.Text>
          </Form.Group>

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
