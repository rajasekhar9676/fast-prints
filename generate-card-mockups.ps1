Add-Type -AssemblyName System.Drawing

$productsDir = "C:\Users\mraja\Desktop\Gitfastprints\fast-prints\public\images\products"
$infinityPath = Join-Path $productsDir "visiting-card-infinity.jpg"
$vajrankhPath = Join-Path $productsDir "visiting-card-vajrankh.jpg"
$kashmirPath = Join-Path $productsDir "visiting-card-kashmir.jpg"

function Create-StudioMockup {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [int]$canvasW = 1200,
        [int]$canvasH = 900
    )
    $src = [System.Drawing.Image]::FromFile($inputPath)
    $bmp = New-Object System.Drawing.Bitmap($canvasW, $canvasH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background gradient: very clean, bright premium light gray to pure white studio vignette
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point(0, $canvasH)),
        [System.Drawing.Color]::FromArgb(250, 251, 253),
        [System.Drawing.Color]::FromArgb(238, 241, 246)
    )
    $g.FillRectangle($bgBrush, 0, 0, $canvasW, $canvasH)
    $bgBrush.Dispose()

    # Target card size (maintain 1.768 aspect ratio): e.g. 884 x 500
    $cardW = 880
    $cardH = [int]($cardW * (579.0 / 1024.0)) # ~497
    $cardX = [int](($canvasW - $cardW) / 2)
    $cardY = [int](($canvasH - $cardH) / 2)

    # Multi-layer soft realistic drop shadow
    for ($step = 18; $step -ge 1; $step--) {
        $spread = $step * 2
        $alpha = [int](40 / [Math]::Sqrt($step))
        $shadowColor = [System.Drawing.Color]::FromArgb($alpha, 15, 23, 42)
        $shadowBrush = New-Object System.Drawing.SolidBrush($shadowColor)
        $g.FillRectangle($shadowBrush, $cardX - $step + 4, $cardY + ($step * 1.5) + 6, $cardW + ($step * 2), $cardH + ($step * 1.5))
        $shadowBrush.Dispose()
    }

    # Draw the card
    $g.DrawImage($src, $cardX, $cardY, $cardW, $cardH)

    # Crisp card edge border (300GSM card cut edge highlight)
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(35, 0, 0, 0), 1)
    $g.DrawRectangle($borderPen, $cardX, $cardY, $cardW, $cardH)
    $borderPen.Dispose()

    $g.Dispose()
    $src.Dispose()

    # Save as high quality JPEG
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)
    $bmp.Save($outputPath, $encoder, $encoderParams)
    $bmp.Dispose()
    Write-Output "Created: $outputPath"
}

Create-StudioMockup $infinityPath (Join-Path $productsDir "visiting-card-infinity-studio.jpg")
Create-StudioMockup $vajrankhPath (Join-Path $productsDir "visiting-card-vajrankh-studio.jpg")
Create-StudioMockup $kashmirPath (Join-Path $productsDir "visiting-card-kashmir-studio.jpg")
