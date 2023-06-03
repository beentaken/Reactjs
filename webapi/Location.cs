using System;

namespace webapi
{
    public class Location
    {
        public DateOnly Date { get; set; }

        public required string Country { get; set; }

        public required string Continent { get; set; }
        private static Random random = new Random();
        public int Population { get; set ; }

        public Location()
        {
            Population = random.Next(0, 10000000);
        }
        public string? Summary { get; set; }
    }
}
