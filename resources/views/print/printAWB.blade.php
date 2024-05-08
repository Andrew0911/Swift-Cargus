<!DOCTYPE html>

<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
</head>

<body>

    <style>
        <?php
            include('C:/Programe/XAMPP/htdocs/SwiftCargus/resources/css/print.css');
        ?>
    </style>

    <div class="container">
        <div class="upper-section">
            <div class="logo"> 
                <div class="logo-name"> 
                    <img src="{{ asset('img/cloud.png') }}" style="height: 40px; width: 40px;"/> 
                    &nbsp; 
                    <span class="bold-550"> Swift Cargus </span> 
                </div>
                <div class="awb">
                    <div class="awb-text"> AWB </div>
                    <div class="awb-number"> 9834675201 </div> 
                </div>
            </div>
            
            <div class="barcode"> 
                <div style="display: flex; justify-content: center;"> 
                    <img style="width:9.1cm;height:2.2cm;"
                    src="data:image/png;base64,{{DNS1D::getBarcodePNG('9834675201', 'C128')}}"/> 
                </div> 
                <div class="package-count"> 
                    <div> 1 </div>
                    <div style="font-weight: normal;"> of </div>
                    <div> 1 </div>

                </div>
            </div>
            
            <div class="sender">  
                <div style="font-weight: 650;"> Andrei Horceag - cont personal </div>
                <div> Strada Științei, Nr. 153, Zip Code 800170 </div>
                <div> <span class="bold-550"> Phone: </span> 0741069329 </div>
                <div> <span class="bold-550"> County: </span> Galați </div>
                <div> <span class="bold-550"> Locality: </span> Galați </div>
            </div>

            <div class="recipient"> 
                <div class="recipient-county-locality"> Galați - Galați </div>
                <div> Strada Științei, Nr. 153, Zip Code 800170 </div>
                <div> <span class="bold-550"> Phone: </span> 0741069329 </div>

            </div>
        </div>
        
        <div class="bottom-section"> 
            <div class="content"> 
                <div class="content-info"> 
                    <div> Packages: &nbsp; 
                        <span class="bold-650"> 1 </span> 
                    </div>
                    <div> Weight: &nbsp; 
                        <span class="bold-650"> 1.00 kg </span>
                    </div>
                    <div> Value: &nbsp; 
                        <span class="bold-650"> 56.3408 RON </span>
                    </div>
                    <div> Service Type: &nbsp; 
                        <span class="bold-650"> Standard </span>
                    </div>
                </div>
                <div class="date"> 07-05-2024 12:41:37 </div>
            </div>
            <div class="qr-code"> 
                <img style="height: 130px; width: 130px"
                src="data:image/png;base64,{{DNS2D::getBarcodePNG('9834675201', 'QRCODE')}}"/> 
            </div>
        </div>
    </div>
        
</body>

</html>