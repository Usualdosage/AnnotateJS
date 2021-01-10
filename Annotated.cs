using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnnotateJS
{
    /// <summary>
    /// When added to a property, indicates to the Annotate extension to render the annotation attributes to the markup.
    /// </summary>
    public class Annotated : Attribute
    {
        /// <summary>
        /// Renders a label to an HTML input element.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Sets the placeholder property of an HTML element.
        /// </summary>
        public string Placeholder { get; set; }

        /// <summary>
        /// Sets the required flag of an HTML element
        /// </summary>
        public bool Required { get; set; }

        /// <summary>
        /// Autofocuses to the element when the page loads.
        /// </summary>
        public bool Autofocus { get; set; }

        /// <summary>
        /// Indicates whether or not this element should be validated.
        /// </summary>
        public bool Validate { get; set; }

        /// <summary>
        /// If validated, this pattern will be used. See PATTERNS above for possible types.
        /// </summary>
        public string Pattern { get; set; }

        /// <summary>
        /// The CSS class to apply to wrap the element with if validation fails.
        /// </summary>
        public string ErrorClass { get; set; }

        /// <summary>
        /// The error message to display if validation fails. If none is provided, will concatenate "required", and "pattern"
        /// in error display. 
        /// </summary>
        /// <example>
        /// Field Name is required, and should be (a/an) alphanumeric.
        /// </example>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Renders the attribute to a JSON formatted string.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return "{" + string.Format("label:\"{0}\",placeholder:\"{1}\",autofocus:{2},required:{3},validate:{4},pattern:\"{5}\",errorClass:\"{6}\",errorMessage:\"{7}\"",
                Label ?? string.Empty, Placeholder ?? string.Empty, Autofocus.ToString().ToLower(),
                Required.ToString().ToLower(), Validate.ToString().ToLower(), Pattern ?? string.Empty,
                ErrorClass ?? string.Empty, ErrorMessage ?? string.Empty) + "}";
        }
    }
}
