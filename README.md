# Overview

Annotate.js is a lightweight Javascript library that parses data annotations added to JSON objects. It is usable either standalone or within the Microsoft ASP.NET MVC framework.

With Annotate.js's code-once methodology, all model binding, validation, and state management happens at the model level with the simple use of annotations. A JSON model can be annotated either in native Javascript by extending the model, or a .NET model can be annotated using Annotate.js's attributes, so that it renders a fully annotated JSON object to the client.

# State Persistence

When the client renders, Annotate.js examines the annotated model, manages state tracking (any changes to a form are automatically persisted to the model, similar to Knockout.js) and automatically applies validation to the field. If property values were set for the model, the values will populate in the form automatically. No binding code is necessary.

# Validation

Annotate.js uses both the native HTML5 validations (required, field types) as well as option regular expressions. Annotate.js can natively handle validation for:

- Telephone
- Credit Card
- Date (MM/DD/YYYY or DD/MM/YYYY)
- Email
- Domain
- URL
- Alpha
- Alphanumeric
- Integer
- Money
- Positive number
- Hex color
- Time

# Annotations

Field annotations available to Annotate.js:

- Required
- Placeholder
- Pattern (Regex or one of the 14 provided HTML validations)
- Auto focus
- Placeholder
- Label

# Usage (Javascript with jQuery)

- Step 1: Download and add the Javascript library.
```<script src="/Scripts/annotate_min.js"></script>```
                
- Step 2: Build your annotated object model.
```
var user = {
    $name: { label: "Username", placeholder: "Enter Name", autofocus: true, 
                required: true, validate: true, pattern: "alpha", errorClass: "error", 
                errorMessage: "Name is required and must contain only letters." },
    name: "John Doe",
    $email: { label: "Email Address", placeholder: "joe@test.com", required: true, 
                validate: true, pattern: "email", errorClass: "error" },
    email: "john.doe@gmail.com",
            
    $phone: { label: "Telephone Number", placeholder: "(555)-111-1111", required: true, 
                validate: true, pattern: "phone" },
    phone: null
};
```
            
An annotated object model is simply your existing JSON object model, with some extra properties. For example, the annotation for the name field in the above example is $name. You can see that there are some fields in that object which describe how the form field will be notated.


- Step 3: Add your form fields.
```
<form id="main-form">
    <input id="name" type="text" />
    <input id="email" type="text" />
    <input id="phone" type="tel" />
</form>
```
The IDs of the HTML elements must exactly match the property names of the JSON object!

Step 4: Call the annotate() method on the form.
```$("#main-form").annotate(userData);```

# Usage (MVC)

Step 1: Download and add the Javascript library.
```<script src="/Scripts/annotate_min.js"></script>```
                
Step 2: Add Annotate.js via the NuGet Package.

```PM> Install-Package Annotate.js```

Step 3: Build your annotated object model.

```
public class UserModel
{
    [Annotated(Autofocus=true, 
        ErrorClass="error", 
        ErrorMessage="User Name is required and must be all letters.", 
        Label="User Name", 
        Pattern="alpha", 
        Placeholder="Enter User Name", 
        Required=true, 
        Validate=true)]
    public string UserName { get; set; }

    [Annotated(Autofocus = true, 
        ErrorClass = "error", 
        ErrorMessage = "Email is required and must be valid.",
        Label = "Email Address", 
        Pattern = "email", 
        Placeholder = "john@doe.com", 
        Required = true, 
        Validate = true)]
    public string EmailAddress { get; set; }

    [Annotated(Autofocus = true, 
        ErrorClass = "error", 
        ErrorMessage = "Telephone number is required and must be valid.",
        Label = "Telephone Number", 
        Pattern = "telephone", 
        Placeholder = "(555) 555-1212", 
        Required = true, 
        Validate = true)]
    public string TelephoneNumber { get; set; }
}
```

Step 4: Add your form fields.

```
<form id="main-form">
    <input id="UserName" type="text" />
    <input id="EmailAddress" type="text" />
    <input id="TelephoneNumber" type="tel" />
</form>
```

The IDs of the HTML elements must exactly match the property names of the C# object model!

- Step 5 (Optional): Handle your intial model binding.
```
public ActionResult TestForm()
{
    // Create a sample model and add some properties
    UserModel model = new UserModel();
    model.UserName = "Test User Guy";
    model.Address1 = "123 Main Street";

    // Annotate it and add it to View Data
    var annotatedModel = model.AnnotateJSON<UserModel>();
    ViewData.Add(new KeyValuePair<string, object>("AnnotateJSModel", annotatedModel));

    // Other options include simply returning the model in the view and using Razor to call the 
    // AnnotateJSON extension method, or adding to ViewBag...many possibilites
    return View();
}
```
Step 6: Render the model and annotate it.
```
<script type="text/javascript">
$(function () {

    @{
        var modelData = Model.AnnotateJSON();

        // - or, if binding -

        var viewModelData = ViewData["AnnotateJSModel"];
    }

    var userData = @viewModelData

    // Modify the form with the annotations
    $("#main-form").annotate(userData);
});
</script>
```
