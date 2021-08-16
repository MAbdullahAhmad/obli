## `view`:

A `Function` that:

1. accepts : `template_path` to read file using `fs.createReadStream` and `data` that it embed in template-file's respective placeholders
2. returns `Duplex-Stream` for reading altered data

template may be html, css, js or any other file with `utf-8` encoding.

### Example Template

for template:

```css
  body {
    color: [[color]];
  }
```

data:

```json
  {
    "color": "#112233"
  }
```

will produce result

```css
  body {
    color: #112233;
  }
```

>There may be more than one data_placeholders in one single file

## Template Extension

We're using `.green.*` for olib. Example: `index.green.html`