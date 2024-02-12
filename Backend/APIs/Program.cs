using APIs.Adaptors;
using APIs.Models;
using APIs.Reposetories;
using APIs.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using APIs.Seeds;
using APIs.Constants;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<Context>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("cs")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<Context>()
                .AddDefaultTokenProviders();

//[Authoriz] used JWT Token in Chck Authantiaction
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudiance"],
        IssuerSigningKey =
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});
builder.Services.AddAuthorization(config =>
{
    //Cities
    config.AddPolicy(Permissions.CitiesDisplay.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.CitiesDisplay.ToString());
    });
    config.AddPolicy(Permissions.CitiesCreate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.CitiesCreate.ToString());
    });
    config.AddPolicy(Permissions.CitiesDelete.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.CitiesDelete.ToString());
    });
    config.AddPolicy(Permissions.CitiesUpdate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.CitiesUpdate.ToString());
    });

    //Branches
    config.AddPolicy(Permissions.BranchesDisplay.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.BranchesDisplay.ToString());
    });
    config.AddPolicy(Permissions.BranchesCreate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.BranchesCreate.ToString());
    });
    config.AddPolicy(Permissions.BranchesDelete.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.BranchesDelete.ToString());
    });
    config.AddPolicy(Permissions.BranchesUpdate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.BranchesUpdate.ToString());
    });

    //Governates
    config.AddPolicy(Permissions.GovernatesDisplay.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.GovernatesDisplay.ToString());
    });
    config.AddPolicy(Permissions.GovernatesCreate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.GovernatesCreate.ToString());
    });
    config.AddPolicy(Permissions.GovernatesDelete.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.GovernatesDelete.ToString());
    });
    config.AddPolicy(Permissions.GovernatesUpdate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.GovernatesUpdate.ToString());
    });

    //Orders
    config.AddPolicy(Permissions.OrdersDisplay.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.OrdersDisplay.ToString());
    });
    config.AddPolicy(Permissions.OrdersCreate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.OrdersCreate.ToString());
    });
    config.AddPolicy(Permissions.OrdersDelete.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.OrdersDelete.ToString());
    });
    config.AddPolicy(Permissions.OrdersUpdate.ToString(), policyBuilder =>
    {
        policyBuilder.RequireClaim("Permission", Permissions.OrdersUpdate.ToString());
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo", Version = "v1" });
});
builder.Services.AddSwaggerGen(swagger =>
{
    //This�is�to�generate�the�Default�UI�of�Swagger�Documentation����
    swagger.SwaggerDoc("v2", new OpenApiInfo
    {
        Version = "v1",
        Title = "ASP.NET�5�Web�API",
        Description = " ITI Projrcy"
    });

    //�To�Enable�authorization�using�Swagger�(JWT)����
    swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter�'Bearer'�[space]�and�then�your�valid�token�in�the�text�input�below.\r\n\r\nExample:�\"Bearer�eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"",
    });
    swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
        new OpenApiSecurityScheme
        {
        Reference = new OpenApiReference
        {
        Type = ReferenceType.SecurityScheme,
        Id = "Bearer"
        }
        },
        new string[] {}
        }
    });
});


//repositories
builder.Services.AddScoped<IPaymentRepo, PaymentRepo>();
builder.Services.AddScoped<IGovernateRepo, GovernateRepo>();
builder.Services.AddScoped<IBranchRepo, BranchRepo>();
builder.Services.AddScoped<ICityRepo, CityRepo>();
builder.Services.AddScoped<IOrderStateRepo, OrderStateRepo>();
builder.Services.AddScoped<IOrderRepo, OrderRepo>();
builder.Services.AddScoped<IOrderTypeRepo, OrderTypeRepo>();
builder.Services.AddScoped<IShipmentRepo, ShipmentRepo>();
builder.Services.AddScoped<IWeightSettingsRepo, WeightSettingsRepo>();

//services
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IGovernateService, GovernateService>();
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IOrderStateService, OrderStateService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IOrderTypeService, OrderTypeService>();

//adaptors
builder.Services.AddScoped<IShipmentAdaptor, ShipmentAdaptor>();
builder.Services.AddScoped<IPaymentAdaptor, PaymentAdaptor>();
builder.Services.AddScoped<IGovernateAdaptor, GovernateAdaptor>();
builder.Services.AddScoped<IBranchAdaptor, BranchAdaptor>();
builder.Services.AddScoped<ICityAdaptor, CityAdaptor>();
builder.Services.AddScoped<IOrderStateAdaptor, OrderStateAdaptor>();
builder.Services.AddScoped<IOrderAdaptor, OrderAdaptor>();
builder.Services.AddScoped<IOrderTypeAdaptor, OrderTypeAdaptor>();
builder.Services.AddScoped<IProductAdaptor, ProductAdaptor>();
builder.Services.AddScoped<IClientPhoneAdaptor, ClientPhoneAdaptor>();

var app = builder.Build();

//Seeding
#region Seeding
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var loggerFactory = services.GetRequiredService<ILoggerFactory>();
var logger = loggerFactory.CreateLogger("app");
try
{
    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    await DefaultRoles.SeedAsync(roleManager);
    await DefaultUsers.SeedMerchantUserAsync(userManager, roleManager);
    await DefaultUsers.SeedSuperAdminAsync(userManager, roleManager);
    logger.LogInformation("Finished Seeding Default Data");
    logger.LogInformation("Application Starting");
}
catch (Exception ex)
{
    logger.LogWarning(ex, "An error occurred seeding the DB");
}
#endregion
//End Sedding


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
