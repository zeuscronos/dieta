<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Productos</title>
<style type="text/css">
.producto {
    display: inline-block;
    width: 200px;
    border: dashed 1px #0099FF;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin: 3px;
}
.producto .genero {
    padding: 8px;
    text-align: center;
    text-transform: uppercase;
    font-family: Verdana, Geneva, sans-serif;
    font-size: 20px;
    color: #fff;
    background-color: #1485ff;
}
.producto .genero.Mujer { background-color: #ff0066 !important; }
.producto .descripcion {
    min-height: 32px;
}
.producto .marca_valor { font-weight: bold; text-transform: uppercase; }
.producto .url {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url("imgs/sprites.png");
    background-position: -1px -1px;
    outline: none;
}
.producto img.vistaprevia {
    max-width: 100%;
}
.producto .precio {
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 20px;
    color: #d00;
    background-color: #feff26;
    padding: 0px 4px;
    border: 1px solid #d00;
    border-radius: 5px;
}
</style>
</head>
<body>

<xsl:for-each select="/productos/producto">
    <div class="producto">
        <div>
            <xsl:attribute name="class"><xsl:value-of select="concat('genero ', genero)"/></xsl:attribute>
            <xsl:value-of select="genero"/>
        </div>
        <div style="padding:6px 6px 0;">
            <div class="descripcion"><xsl:value-of select="descripcion"/></div>
            <div style="text-align:right;margin-top:6px;">
                <span>Marca: </span>
                <span class="marca_valor"><xsl:value-of select="marca"/></span>
            </div>
            <div style="text-align:right;">
                <table style="display:inline-block;">
                    <tr>
                        <td><span>Ref.: <xsl:value-of select="@referencia"/></span></td>
                        <td>
                            <a class="url" target="_blank">
                                <xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="position:relative;">
            <img class="vistaprevia">
                <xsl:attribute name="src">photos/img_<xsl:value-of select="@referencia"/>.jpg</xsl:attribute>
            </img>
            <span class="precio"><xsl:value-of select="precio"/> €</span>
        </div>
    </div>
</xsl:for-each>

</body>
</html>
</xsl:template>
</xsl:stylesheet>
