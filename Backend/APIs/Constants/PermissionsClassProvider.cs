namespace APIs.Constants
{
    public static class PermissionsClassProvider
    {
        public static List<string> GeneratePermissionsForEntity(string entity)
        {
            return new List<string>()
            {
                $"{entity}Create",
                $"{entity}Display",
                $"{entity}Update",
                $"{entity}Delete",
            };
        }

        public static class Cities
        {
            public const string Display = "CitiesDisplay";
            public const string Create = "CitiesCreate";
            public const string Update = "CitiesUpdate";
            public const string Delete = "CitiesDelete";
        }

        public static class Branches
        {
            public const string Display = "BranchesDisplay";
            public const string Create = "BranchesCreate";
            public const string Update = "BranchesUpdate";
            public const string Delete = "BranchesDelete";
        }

        public static class Governates
        {
            public const string Display = "GovernatesDisplay";
            public const string Create = "GovernatesCreate";
            public const string Update = "GovernatesUpdate";
            public const string Delete = "GovernatesDelete";
        }

        public static class Orders
        {
            public const string Display = "OrdersDisplay";
            public const string Create = "OrdersCreate";
            public const string Update = "OrdersUpdate";
            public const string Delete = "OrdersDelete";
        }
    }
}
