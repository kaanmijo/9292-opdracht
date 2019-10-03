using _9292_opdracht.Models;
using _9292_opdracht.Service;
using NUnit.Framework;

namespace Test
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Test1()
        {
            // Create a new service
            ApiService service = CreateApiService();

            // Do a request for the city of Rotterdam
            ApiResponse result = service.DoRequest("rotterdam");

            // Check if the ID of the city is the same. If this is the case, the test is successful
            Assert.AreEqual(result.Id, 2747891);
        }

        private ApiService CreateApiService()
        {
            return new ApiService();
        }
    }
}