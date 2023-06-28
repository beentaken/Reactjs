using System.Collections.Generic;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class AddCustomHeaderOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.Parameters == null)
            operation.Parameters = new List<OpenApiParameter>();

        // Add custom header
        operation.Parameters.Add(new OpenApiParameter
        {
            Name = "custom",
            In = ParameterLocation.Header,
            Description = "custom header description",
            Required = false, // Set to true if the header is required
            Schema = new OpenApiSchema
            {
                Type = "string",
                Default = new OpenApiString("XXXXXX")
            },
        });
    }
}
