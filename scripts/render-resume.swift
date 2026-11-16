import Foundation
import CryptoKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
let pdfURL=URL(fileURLWithPath:CommandLine.arguments[1]),output=URL(fileURLWithPath:CommandLine.arguments[2])
guard let pdf=CGPDFDocument(pdfURL as CFURL) else{exit(1)}
var pages:[[String:Any]]=[]
for number in 1...pdf.numberOfPages{
 guard let page=pdf.page(at:number) else{exit(1)}
 let bounds=page.getBoxRect(.mediaBox),width=1440,height=Int((1440*bounds.height/bounds.width).rounded())
 let context=CGContext(data:nil,width:width,height:height,bitsPerComponent:8,bytesPerRow:width*4,space:CGColorSpace(name:CGColorSpace.sRGB)!,bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
 context.setFillColor(CGColor(gray:1,alpha:1));context.fill(CGRect(x:0,y:0,width:width,height:height));context.scaleBy(x:CGFloat(width)/bounds.width,y:CGFloat(height)/bounds.height);context.translateBy(x:-bounds.minX,y:-bounds.minY);context.drawPDFPage(page)
 let image=context.makeImage()!,dest=CGImageDestinationCreateWithURL(output.appendingPathComponent("page-\(number).jpg") as CFURL,UTType.jpeg.identifier as CFString,1,nil)!
 CGImageDestinationAddImage(dest,image,[kCGImageDestinationLossyCompressionQuality:0.9] as CFDictionary);guard CGImageDestinationFinalize(dest) else{exit(1)}
 pages.append(["number":number,"src":"/assets/resume/page-\(number).jpg","width":width,"height":height]);print("rendered page",number,width,height)
}
let hash=SHA256.hash(data:try Data(contentsOf:pdfURL)).map{String(format:"%02x",$0)}.joined()
let manifest:[String:Any]=["sourceSha256":hash,"pageCount":pdf.numberOfPages,"pages":pages]
try JSONSerialization.data(withJSONObject:manifest,options:.prettyPrinted).write(to:URL(fileURLWithPath:CommandLine.arguments[3]))
