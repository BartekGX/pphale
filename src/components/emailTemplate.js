export const resetPasswordTemplate = `
export const resetPasswordTemplate = \`
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
   <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!--[if mso]>
      <xml>
         <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG/>
         </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if !mso]><!--><!--<![endif]-->
      <style>
         * {
         box-sizing: border-box;
         }
         body {
         margin: 0;
         padding: 0;
         }
         a[x-apple-data-detectors] {
         color: inherit !important;
         text-decoration: inherit !important;
         }
         #MessageViewBody a {
         color: inherit;
         text-decoration: none;
         }
         p {
         line-height: inherit
         }
         .desktop_hide,
         .desktop_hide table {
         mso-hide: all;
         display: none;
         max-height: 0px;
         overflow: hidden;
         }
         .image_block img+div {
         display: none;
         }
         @media (max-width:620px) {
         .desktop_hide table.icons-inner {
         display: inline-block !important;
         }
         .icons-inner {
         text-align: center;
         }
         .icons-inner td {
         margin: 0 auto;
         }
         .mobile_hide {
         display: none;
         }
         .row-content {
         width: 100% !important;
         }
         .stack .column {
         width: 100%;
         display: block;
         }
         .mobile_hide {
         min-height: 0;
         max-height: 0;
         max-width: 0;
         overflow: hidden;
         font-size: 0px;
         }
         .desktop_hide,
         .desktop_hide table {
         display: table !important;
         max-height: none !important;
         }
         .row-1 .column-1 .block-1.heading_block h1 {
         font-size: 19px !important;
         }
         .row-1 .column-1 .block-3.paragraph_block td.pad>div {
         text-align: center !important;
         font-size: 14px !important;
         }
         }
      </style>
   </head>
   <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
      <tbody>
         <tr>
            <td>
               <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                     <tr>
                        <td>
                           <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                       <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                             <td class="pad">
                                                <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;"><span class="tinyMce-placeholder">Przywracanie hasła - AutoLand</span></h1>
                                             </td>
                                          </tr>
                                       </table>
                                       <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                             <td class="pad">
                                                <div class="alignment" align="center">
                                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                      <tr>
                                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
                                                      </tr>
                                                   </table>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                          <tr>
                                             <td class="pad">
                                                <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                   <p style="margin: 0;">Została wysłana prośba o zresetowanie hasła dla {email}, jeżeli nie wysyłałeś tej prośby to zignoruj tę wiadomość.</p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <div class="spacer_block block-4" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                                       <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                          <tr>
                                             <td class="pad">
                                                <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                   <p style="margin: 0;">Naciśnij przycisk, aby przywrócić hasło dla {email}.</p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table class="button_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                             <td class="pad">
                                                <div class="alignment" align="center">
                                                   <!--[if mso]>
                                                   <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:148px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#7747FF">
                                                      <w:anchorlock/>
                                                      <v:textbox inset="0px,0px,0px,0px">
                                                         <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
                                                            <![endif]-->
                                                            <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#7747FF;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Przywróć hasło</span></span></div>
                                                            <!--[if mso]>
                                                         </center>
                                                      </v:textbox>
                                                   </v:roundrect>
                                                   <![endif]-->
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                          <tr>
                                             <td class="pad">
                                                <div style="color:#8c8e90;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:19.2px;">
                                                   <p style="margin: 0;">Nie odpowiadaj na tego maila</p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
   </body>
</html>
\`
`