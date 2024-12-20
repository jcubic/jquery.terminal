---
sidebar_position: 1
---

# Terminal Instance

Terminal instance is the main API that allow you to interact with the jQuery Terminal library. To
access the terminal instance you can use return value from terminal call. Or access it with `this`
keyword inside methods.

```javascript
const term = $('body').terminal({
    echo(...args) {
        this.echo(args.join(' '));
    }
}, {
    checkArity: false,
    greetings: false
});

term.echo('Welcome to my terminal');
```

In above code you code we disabled the terminal and call echo on terminal instance in `term`
constant.  We also use `this.echo(...)` to implement `echo` command.

## Common Tasks

Here is a list of most common task you can use with the Terminal. The full list of methos is in
[Reference Guide](#???).

### Print Text on the Terminal

To print the text you use the `echo` method. The first argument is a value that you want to echo and
the second are options. More about echo method in [What you can echo?](/docs/deep-dive/echo) Guide.

### Inserting Text Into the Command

### Chaning Command

### Getting The Command

### Clear the Terminal

### Destroy the Terminal

### Pause and Resume the Terminal

### Reading Text from User

### Updating Lines
