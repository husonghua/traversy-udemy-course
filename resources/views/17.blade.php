<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Breakout</title>
        <link rel="stylesheet" href="{{mix('css/main.css')}}">
        <script src="{{mix('js/app.js')}}" defer></script>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
    />
    </head>
    <body class='antialiased bg-gray-100'>
        <div id="app">
            <traversy-17></traversy-17>
        </div>
    </body>
</html>
