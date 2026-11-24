import { expect, test } from '../fixtures/fixtures';
import { articleRequestObject } from '../request-objects/articles/POST_articles';
import { generateSchema } from '../utils/schema-generator';
import { validateSchema } from '../utils/schema-validator';



test('Create article, update it and delete it', async ({ api }) => {

  //create an Article
  const createArticleResponse = await api
    .path('articles/')
    .body(articleRequestObject)
    .postRequest(201)

  //generateSchema('articles','POST_articles',createArticleResponse)
  await validateSchema('articles','POST_articles',createArticleResponse)

  //get all Articles and assert that the 1st one is the one we created
  const getArticlesResponse = await api
    .path('articles/')
    .params({ limit: 10, offset: 0 })
    .getRequest(200)

  expect(getArticlesResponse.articles[0].title).toEqual("Sotiris api test")

  //generateSchema('articles','GET_articles',getArticlesResponse)
  await validateSchema('articles','GET_articles',getArticlesResponse)

  const createdArticleSlugId = getArticlesResponse.articles[0].slug

  //Update the created article
  const updateArticleResponse = await api
    .path(`articles/${createdArticleSlugId}`)
    .body({ "article": { "title": "Sotiris api test updated", "description": "desc updated", "body": "body updated", "tagList": [], "slug": "Sotiris-api-test-85028" } })
    .putRequest(200)

  //Get articles and assert that we indeed updated the articles title
  const getArticlesResponse2 = await api
    .path('articles/')
    .params({ limit: 10, offset: 0 })
    .getRequest(200)

  expect(getArticlesResponse2.articles[0].title).toEqual("Sotiris api test updated")

  const updatedArticleSlugId = getArticlesResponse2.articles[0].slug

  //Delete the article
  await api
    .path(`articles/${updatedArticleSlugId}`)
    .deleteRequest(204)

  //Get all articles and verify that we indeed deleted the article
  const getArticlesResponse3 = await api
    .path('articles/')
    .params({ limit: 10, offset: 0 })
    .getRequest(200)

  expect(getArticlesResponse3.articles[0].title).not.toEqual("Sotiris api test updated")

});

test('test', async ({ api }) => {

  //get all Articles and assert that the 1st one is the one we created
  const getArticlesResponse = await api
    .path('articles/')
    .params({ limit: 10, offset: 0 })
    .getRequest(202)

    

});






