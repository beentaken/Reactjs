using System;

namespace webapi.Model
{
    public class Menu
    {
        public string[] Title { get; set; }

        public required string Role { get; set; }
    }
}
