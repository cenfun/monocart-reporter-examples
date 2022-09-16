
module.exports = {
    reporter: [ 
        ['html', { outputFolder: './playwright-report/2',outputFile:'results.html', open: 'never' }], 
        ["dot"], 
        ["json", { outputFile: "alure-test-results.json" }],
        //['experimental-allure-playwright'],
        ['junit', { outputFile: 'results.xml' , outputFolder:"./playwright-report/grid"}],
        ['monocart-reporter', {  outputFile: 'playwright-reportA/grid/indexOther.html'}]
    ]
}