
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://127.0.0.1:5500/public/index.html')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    await new Promise((r) => setTimeout(r, 2000));
    expect(displayed).toBe(true)
})

test('should make sure that draw button displays', async () => {
    const btn = await driver.findElement(By.id('draw'))
    const square = await btn.isDisplayed()
    await new Promise((r) => setTimeout(r,2000));
    expect(square).toBe(true)
})

test('make sure paragraphs display',async () => {
    const text = await driver.findElement(By.id('para'))
    const bigText = await text.isDisplayed()
    await new Promise((r) => setTimeout(r,2000));
    expect(bigText).toBeTruthy()
})