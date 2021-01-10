#Overview

Annotate.js is a lightweight Javascript library that parses data annotations added to JSON objects. It is usable either standalone or within the Microsoft ASP.NET MVC framework.

With Annotate.js's code-once methodology, all model binding, validation, and state management happens at the model level with the simple use of annotations. A JSON model can be annotated either in native Javascript by extending the model, or a .NET model can be annotated using Annotate.js's attributes, so that it renders a fully annotated JSON object to the client.

#State Persistence

When the client renders, Annotate.js examines the annotated model, manages state tracking (any changes to a form are automatically persisted to the model, similar to Knockout.js) and automatically applies validation to the field. If property values were set for the model, the values will populate in the form automatically. No binding code is necessary.

#Validation

Annotate.js uses both the native HTML5 validations (required, field types) as well as option regular expressions. Annotate.js can natively handle validation for:

-Telephone
-Credit Card
-Date (MM/DD/YYYY or DD/MM/YYYY)
-Email
-Domain
-URL
-Alpha
-Alphanumeric
-Integer
-Money
-Positive number
-Hex color
-Time

#Annotations

Field annotations available to Annotate.js:

-Required
-Placeholder
-Pattern (Regex or one of the 14 provided HTML validations)
-Auto focus
-Placeholder
-Label
