import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/home.module.css'

export default function Home() {
  const router = useRouter();

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
            <Form.Check type="checkbox" label="Veg." inline="true"/>
            <Form.Check type="checkbox" label="Vegan" inline="true"/>
            <Form.Check type="checkbox" label="Paleo" inline="true"/>
          </Form.Group>

          <Form.Group className={["mb-3", styles.form_input].join(" ")}>
            <Form.Control type="input" placeholder="Custom Restrictions" />
            <Form.Text className="text-muted">
              Enter commas between each restricted ingredient
            </Form.Text>
          </Form.Group>

          <Button variant="primary" className={styles.search_btn} type="button" onClick={() => router.push('/search')}>
            Search
          </Button>
        </Form>
      </main>
    </div>
  )
}
