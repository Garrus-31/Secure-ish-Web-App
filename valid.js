function SanitizeInput(event) 
{
    const regex = /[^a-zA-Z0-9_@. ]/g;
    const currentValue = event.target.value;

    if (regex.test(currentValue)) 
        {
            event.target.value = currentValue.replace(regex, "");
        }
}