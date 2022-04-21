import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../styles/search.module.css';

export default function Search() {
  const { query } = useRouter();
  const [recipes, setRecipes] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   fetch('https://randomuser.me/api/')
  //     .then((results) => console.log(results));
  // }, []);

  // const results = [{"id": 0, "url": "https://www.allrecipes.com/recipe/264267/easy-keto-zucchini-frittata/", "title": "Easy Keto Zucchini Frittata", "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5736108.jpg", "ingredients": ["1 tablespoon butter ", "1 onion, sliced ", "1 large zucchini, thinly sliced ", "\u00bd teaspoon sea salt ", "\u00bc teaspoon ground black pepper ", "3 eggs ", "\u00bd cup heavy cream ", "\u00bc teaspoon ground nutmeg ", "1 cup shredded Gouda cheese "], "directions": ["Preheat the oven to 425 degrees F (220 degrees C).", "Melt butter in a medium iron skillet over medium heat; stir in onion. Cook and stir until the onion has softened and turned translucent, about 5 minutes. Add zucchini and cook until tender, about 3 minutes. Season with salt and black pepper.", "Whisk eggs, cream, and nutmeg in a bowl. Pour over zucchini mixture and sprinkle with Gouda cheese.", "Place iron skillet in the preheated oven and bake until golden and set, 15 to 20 minutes."], "calories": 181, "time": "35 mins "}, {"id": 1, "url": "https://www.allrecipes.com/recipe/264200/candy-sushi-for-kids/", "title": "Candy Sushi for Kids", "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9230075.jpg", "ingredients": ["8 crispy marshmallow bars (such as Rice Krispies\u00ae) ", "2 rolls green fruit leather snack (such as Fruit by the Foot\u00ae) ", "1 (2 ounce) package gummy fish candy (such as Swedish Fish\u00ae) "], "directions": ["Cut each crispy rice bar into a circle. Wrap a piece of green fruit leather along the edge of each circle, sushi-roll style. Top each \"sushi roll\" with 1 or 2 gummy fish candies."], "calories": 135, "time": "15 mins "}, {"id": 2, "url": "https://www.allrecipes.com/recipe/264205/keto-spaghetti-squash-lasagna-boats/", "title": "Keto Spaghetti Squash Lasagna Boats", "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6267448.jpg", "ingredients": ["2 spaghetti squash, quartered and seeded ", "1 pound kale ", "1 quart tomatoes ", "1 pound ground beef ", "1 medium yellow onion, minced ", "1 head garlic, peeled and minced ", "\u00bc cup dried basil ", "\u00bc cup dried oregano ", "2 tablespoons kosher salt ", "2 tablespoons red pepper flakes ", "2 tablespoons ground black pepper ", "2 cups shredded mozzarella cheese, divided ", "1 cup cottage cheese, divided ", "\u00bc cup grated Parmesan cheese ", "\u00bd (8 ounce) package cream cheese "], "directions": ["Place 2 pieces of spaghetti squash on a microwave-safe place with cut sides facing down. Microwave on high until tender, about 15 minutes. Repeat with remaining 2 pieces of spaghetti squash. Scoop squash out of shells into a large bowl and reserve shells.", "Transfer 1/2 the cooked squash to a food processor and finely chop. Return squash to the bowl and set aside.", "Preheat the oven to 500 degrees F (260 degrees C).", "Place kale in the food processor and chop finely. Transfer to a bowl and set aside.", "Puree 1/2 the tomatoes in the food processor. Transfer to a bowl and set aside.", "Heat a large skillet over medium-high heat. Cook and stir ground beef, onion, and garlic in the hot skillet until browned and crumbly, 5 to 7 minutes. Add basil, oregano, salt, red pepper flakes, and black pepper. Let simmer for 5 minutes.", "Add spaghetti squash, kale, tomatoes, tomato puree, 1/2 of the mozzarella cheese, 1/2 of the cottage cheese, Parmesan cheese, and cream cheese to the skillet with the ground beef. Reduce heat to low and simmer until cheeses are melted, about 5 minutes. Remove lasagna sauce from heat.", "Spread 2 tablespoons of cottage cheese into each spaghetti squash shell. Scoop lasagna sauce into the shells up to the top. Freeze or refrigerate leftover sauce. Top filled shells with remaining mozzarella cheese.", "Place filled shells on the middle rack of the preheated oven and bake for 10 minutes. Turn the oven to broil and cook lasagnas until cheese is browned, about 5 minutes more."], "calories": 829, "time": "1 hr 30 mins "}, {"id": 3, "url": "https://www.allrecipes.com/recipe/264229/almond-milk-instant-pudding/", "title": "Almond Milk Instant Pudding", "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7826894.jpg", "ingredients": ["2 cups almond milk, divided ", "1 (3.5 ounce) package instant vanilla pudding mix ", "2 teaspoons cornstarch "], "directions": ["Pour 1 cup almond milk into a small saucepan. Add cornstarch and heat over medium heat. Cook, stirring constantly, until bubbly, 3 to 5 minutes. Remove from heat; keep stirring for 30 seconds.", "Pour remaining almond milk into a bowl; add pudding mix. Mix with an electric mixer on low speed until very thick, about 1 minute. Add cornstarch mixture to the pudding mixture. Mix at low speed for 1 minute more.", "Transfer pudding to 4 individual serving bowls. Cover and refrigerate if desired."], "calories": 217, "time": "10 mins "}];

  return (
    <>
        <Link href="/">
          <a>← Search Again</a>
        </Link>
        <p>{query.query}</p>
        <p>{query.restrict}</p>
        <div>
          {
            results.map((recipe) => 
              <div>
                <a href={recipe.url}>
                  <Image
                    priority
                    src={recipe.image != "" ? recipe.image : "/logo.svg"}
                    className={styles.borderCircle}
                    height={144}
                    width={144}
                    alt={recipe.title}
                  />
                  <h1>
                    {recipe.title}
                  </h1>
                  <p>
                    {recipe.time} | {recipe.calories} cals
                  </p>
                </a>
              </div>
            )
          }
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