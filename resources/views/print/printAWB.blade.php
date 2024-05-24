<!DOCTYPE html>

<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>

    <style>
        <?php
            include('C:/Programe/XAMPP/htdocs/SwiftCargus/resources/css/print.css');
        ?>
    </style>

    <div class="body">

        <br/><br/><br/>

        @for ($i = 1; $i <= $packages; $i++)
            <div class="print-container">
                <div class="upper-section">
                    <div class="logo"> 
                        <div class="logo-name"> 
                            <img src="{{ asset('img/cloud.png') }}" style="height: 40px; width: 40px;"/> 
                            &nbsp; 
                            <span class="bold-550"> Swift Cargus </span> 
                        </div>
                        <div class="awb">
                            <div class="awb-text"> AWB </div>
                            <div class="awb-number"> {{$awbNumber}} </div> 
                        </div>
                    </div>
                    
                    <div class="barcode"> 
                        <div style="display: flex; justify-content: center;"> 
                            <img style="width:9.1cm;height:2.2cm;"
                            src="data:image/png;base64,{{DNS1D::getBarcodePNG($awbNumber, 'C128')}}"/> 
                        </div> 
                        <div class="package-count"> 
                            <div> {{$i}} </div>
                            <div style="font-weight: normal;"> of </div>
                            <div> {{$packages}} </div>

                        </div>
                    </div>
                    
                    <div class="sender">  
                        <div style="font-weight: 650;"> {{$senderName}} </div>
                        <div> Strada {{$senderStreet}}, Nr. {{$senderNr}}, Zip Code {{$senderZipCode}} </div>
                        <div> <span class="bold-550"> Phone: </span> {{$senderPhone}} </div>
                        <div> <span class="bold-550"> County: </span> {{$senderCounty}} </div>
                        <div> <span class="bold-550"> Locality: </span> {{$senderLocality}} </div>
                    </div>

                    <div class="recipient"> 
                        <div class="recipient-county-locality"> {{$recipientCounty}} - {{$recipientLocality}} </div>
                        <div style="font-weight: 650;"> {{$recipientName}} </div>
                        <div> Strada {{$recipientStreet}}, Nr. {{$recipientNr}}, Zip Code {{$recipientZipCode}} </div>
                        <div> <span class="bold-550"> Phone: </span> {{$recipientPhone}} </div>

                    </div>
                </div>
                
                <div class="bottom-section"> 
                    <div class="content"> 
                        <div class="content-info"> 
                            <div style="display: flex; flex-direction: column; gap: 10px">
                                <div> Packages: &nbsp; 
                                    <span class="bold-650"> {{$packages}} </span> 
                                </div>
                                <div> Weight: &nbsp; 
                                    <span class="bold-650"> {{$weight}} kg </span>
                                </div>
                                <div> Value: &nbsp; 
                                    <span class="bold-650"> {{$value}} </span>
                                </div>
                                <div> Service Type: &nbsp; 
                                    <span class="bold-650"> {{$service}} </span>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 10px">
                                <div> Length: &nbsp; 
                                    <span class="bold-650"> {{$length}} cm </span> 
                                </div>
                                <div> Width: &nbsp; 
                                    <span class="bold-650"> {{$width}} cm </span>
                                </div>
                                <div> Height: &nbsp; 
                                    <span class="bold-650"> {{$height}}  cm </span>
                                </div>
                                <div> Option Codes: &nbsp; 
                                    <span class="bold-650"> {{$options}} </span>
                                </div>
                            </div>
                        </div>
                        <div class="date"> {{$date}} </div>
                    </div>
                    <div class="qr-code"> 
                        <img style="height: 130px; width: 130px"
                        src="data:image/png;base64,{{DNS2D::getBarcodePNG($awbNumber, 'QRCODE')}}"/> 
                    </div>
                </div>
            </div>

            <br/><br/><br/>
        @endfor
    </div>
        
</body>

</html>