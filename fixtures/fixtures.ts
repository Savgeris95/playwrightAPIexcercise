import { test as base } from '@playwright/test';
import { RequestHandler } from '../utils/request-handler';
import { APILogger } from '../utils/logger';
import { TokenAuth } from '../utils/tokenAuth';


// Declare the types of your fixtures.
type MyFixtures = {
    api: RequestHandler;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
    api: async ({ request }, use) => {

        const tokenAuth = new TokenAuth(request)
        const authToken = await tokenAuth.getToken()
        
        const apiLogger = new APILogger()

        const requestHanlder = new RequestHandler(request,authToken,apiLogger)
        // Use the fixture value in the test.
        await use(requestHanlder);

    },

});

export { expect } from '@playwright/test';