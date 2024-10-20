using System.Collections.Generic;
using System.Threading.Tasks;
using ExternalLibrary;

namespace QuickStart
{
    class ExternalMethods
    {
        public async Task<object> GetPersonInfo(dynamic input)
        {
            var dict = (IDictionary<string, object>)input;
            return await Task.Run(() => new Person(dict["name"].ToString(), dict["email"].ToString(), (int)dict["age"]));
        }
    }
}
