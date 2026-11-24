Add-Type -AssemblyName System.Drawing

$productsDir = "C:\Users\mraja\Desktop\Gitfastprints\fast-prints\public\images\products"
$infinityPath = Join-Path $productsDir "visiting-card-infinity.jpg"
$vajrankhPath = Join-Path $productsDir "visiting-card-vajrankh.jpg"
$kashmirPath = Join-Path $productsDir "visiting-card-kashmir.jpg"
$trioPath = Join-Path $productsDir "visiting-cards-trio-showcase.jpg"
$trioPngPath = "C:\Users\mraja\Desktop\Gitfastprints\fast-prints\public\images\visiting-cards.png"

$canvasW = 1200
$canvasH = 900
$bmp = New-Object System.Drawing.Bitmap($canvasW, $canvasH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Premium studio background: light subtle radial / vertical gradient
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $canvasH)),
    [System.Drawing.Color]::FromArgb(252, 252, 254),
    [System.Drawing.Color]::FromArgb(236, 240, 246)
)
$g.FillRectangle($bgBrush, 0, 0, $canvasW, $canvasH)
$bgBrush.Dispose()

# Subtle warm studio lighting ellipse on the floor
$floorBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 255, 255, 255))
$g.FillEllipse($floorBrush, 100, 200, 1000, 600)
$floorBrush.Dispose()

function Draw-RotatedCard {
    param(
        [System.Drawing.Graphics]$graphics,
        [System.Drawing.Image]$img,
        [float]$centerX,
        [float]$centerY,
        [float]$cardW,
        [float]$cardH,
        [float]$angleDeg,
        [int]$elevation = 12
    )

    $state = $graphics.Save()
    $graphics.TranslateTransform($centerX, $centerY)
    $graphics.RotateTransform($angleDeg)

    $halfW = $cardW / 2.0
    $halfH = $cardH / 2.0

    # Draw soft realistic multi-step shadow
    for ($s = $elevation; $s -ge 1; $s--) {
        $alpha = [int](35 / [Math]::Sqrt($s))
        $shBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, 15, 23, 42))
        $graphics.FillRectangle($shBrush, (-$halfW - $s + 2), (-$halfH + ($s * 1.8) + 4), ($cardW + ($s * 2)), ($cardH + ($s * 1.2)))
        $shBrush.Dispose()
    }

    # Draw card
    $graphics.DrawImage($img, (-$halfW), (-$halfH), $cardW, $cardH)

    # Clean die-cut card border
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(35, 0, 0, 0), 1)
    $graphics.DrawRectangle($pen, (-$halfW), (-$halfH), $cardW, $cardH)
    $pen.Dispose()

    $graphics.Restore($state)
}

$imgInfinity = [System.Drawing.Image]::FromFile($infinityPath)
$imgVajrankh = [System.Drawing.Image]::FromFile($vajrankhPath)
$imgKashmir = [System.Drawing.Image]::FromFile($kashmirPath)

$cardW = 680
$cardH = [int]($cardW * (579.0 / 1024.0)) # ~384

# 1. Left card: Vajrankh Medicares (-9 deg, pushed to left and slightly up)
Draw-RotatedCard $g $imgVajrankh 400 420 $cardW $cardH -9 10

# 2. Right card: DMC Kashmir (+9 deg, pushed to right and slightly up)
Draw-RotatedCard $g $imgKashmir 800 420 $cardW $cardH 9 10

# 3. Center card: Infinity Arrow Solutions (0 deg, centered, in foreground with deeper shadow)
Draw-RotatedCard $g $imgInfinity 600 490 $cardW $cardH 0 20

$g.Dispose()
$imgInfinity.Dispose()
$imgVajrankh.Dispose()
$imgKashmir.Dispose()

# Save JPEG
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)
$bmp.Save($trioPath, $encoder, $encoderParams)

# Also save PNG for public/images/visiting-cards.png
$bmp.Save($trioPngPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
Write-Output "Successfully generated trio showcase images!"
