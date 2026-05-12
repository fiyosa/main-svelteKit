<script lang="ts">
  // Memasukkan seluruh tag ke dalam string untuk menghindari parsing error Svelte pada kurung kurawal JSON
  const scalarHtml =
    `
    <script
      id="api-reference"
      data-url="/api/openapi.json"
      data-configuration='{"theme": "bluePlanet", "layout": "modern", "showSidebar": true, "darkMode": true}'
    ></scr` +
    `ipt>
    <script src="/libs/scalar.js"></scr` +
    `ipt>
  `
</script>

<svelte:head>
  <title>API Documentation | Scalar</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
  </style>
</svelte:head>

<div id="scalar-container">
  {@html scalarHtml}
</div>
