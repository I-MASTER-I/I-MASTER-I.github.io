from tkinter import *
from tkinter.filedialog import *
from tkinter.simpledialog import *
import math

## 함수 선언부
def malloc(h, w, value=0) :
    retMemory = [ [ value for _ in range(w)]  for _ in range(h) ]
    return retMemory

def openFile() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    ## 파일 선택하기
    filename = askopenfilename(parent=window,
                               filetypes=(('RAW 파일', '*.raw'), ('All File', '*.*')))
    ## (중요!) 입력이미지의 높이와 폭 알아내기
    fsize = os.path.getsize(filename)
    inH = inW = int(math.sqrt(fsize))
    ## 입력이미지용 메모리 할당
    inImage = malloc(inH, inW)
    ## 파일 --> 메모리 로딩
    with open(filename, 'rb') as fp:
        for i in range(inH):
            for k in range(inW):
                inImage[i][k] = int(ord(fp.read(1)))

    equalImage()

import struct
def saveFile() :
    global window, canvas, paper, inImage, outImage ,inH, inW, outH, outW ,filename
    if filename == '' or filename == None :
        return
    saveFp = asksaveasfile(parent=window, mode='wb', defaultextension='*.raw',
                           filetypes=(('RAW 파일', '*.raw'), ('All File', '*.*')))
    for i in range(outH) :
        for k in range(outW) :
            saveFp.write(struct.pack('B', outImage[i][k]))
    saveFp.close()
    status.configure(text='저장 파일 :' + saveFp.name)

def displayImage() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    window.geometry(str(outH)+'x'+str(outW))
    if canvas != None :
        canvas.destroy()

    canvas = Canvas(window, height=outH, width=outW)
    paper = PhotoImage(height=outH, width=outW)
    canvas.create_image((outH / 2, outW / 2), image=paper, state='normal')

    # 볼펜으로 콕콕콕 찍기  --> 열라 느림
    # for i in range(outH) :
    #     for k in range(outW) :
    #         r = g = b = outImage[i][k]
    #         paper.put("#%02x%02x%02x" % (r, g, b), (k, i))

    # 메모리에서 처리한 후, 한방에 화면에 보이기 --> 완전 빠름
    rgbString =""
    for i in range(outH) :
        tmpString = "" # 각 줄
        for k in range(outW) :
            r = g = b = outImage[i][k]
            tmpString += "#%02x%02x%02x " % (r, g, b)
        rgbString += '{' + tmpString + '} '
    paper.put(rgbString)
    canvas.pack()
    status.configure(text='이미지정보:' + str(outH) + 'x' + str(outW)+'      '+filename)
########## 영상 처리 함수 ##########

def embossImage() : # 엠보싱 효과
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    # (중요!) 마스크
    mSize = 3
    mask = [ [-1, 0, 0],
             [ 0, 0, 0],
             [ 0, 0, 1] ]

    tmpInImage = malloc(inH+2, inW+2, 127)
    tmpOutImage = malloc(outH, outW)
    # inImage --> 임시input
    for i in range(inH) :
        for k in range(inW) :
            tmpInImage[i+1][k+1] = float(inImage[i][k])
    # 회선 연산 : 마스크로 긁어가면서 처리하기
    for i in range(1, inH+1) :
        for k in range(1, inW+1) :
            # 각 점을 처리
            S = 0.0
            for m in range(mSize) :
                for n in range(mSize) :
                    S += mask[m][n] * tmpInImage[m+i-1][n+k-1]
            tmpOutImage[i-1][k-1] = S

    ## 마무리.. 마스크에 따라서 127 더할지 결정
    for i in range(outH) :
        for k in range(outW) :
            tmpOutImage[i][k] += 127.0
    ## 임시Output --> outImage .... 오버플로 체크
    for i in range(outH):
        for k in range(outW):
            if tmpOutImage[i][k] > 255 :
                outImage[i][k] = 255
            elif tmpOutImage[i][k] < 0:
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(tmpOutImage[i][k])
    ########################
    displayImage()

def blurrImage() : # 블러링 효과
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    # (중요!) 마스크
    mSize = 3
    mask = [ [ 1/9.0,  1/9.0,  1/9.0],
             [ 1/9.0,  1/9.0,  1/9.0],
             [ 1/9.0,  1/9.0,  1/9.0] ]

    tmpInImage = malloc(inH+2, inW+2, 127)
    tmpOutImage = malloc(outH, outW)
    # inImage --> 임시input
    for i in range(inH) :
        for k in range(inW) :
            tmpInImage[i+1][k+1] = float(inImage[i][k])
    # 회선 연산 : 마스크로 긁어가면서 처리하기
    for i in range(1, inH+1) :
        for k in range(1, inW+1) :
            # 각 점을 처리
            S = 0.0
            for m in range(mSize) :
                for n in range(mSize) :
                    S += mask[m][n] * tmpInImage[m+i-1][n+k-1]
            tmpOutImage[i-1][k-1] = S

    ## 마무리.. 마스크에 따라서 127 더할지 결정
    # for i in range(outH) :
    #     for k in range(outW) :
    #         tmpOutImage[i][k] += 127.0
    ## 임시Output --> outImage .... 오버플로 체크
    for i in range(outH):
        for k in range(outW):
            if tmpOutImage[i][k] > 255 :
                outImage[i][k] = 255
            elif tmpOutImage[i][k] < 0:
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(tmpOutImage[i][k])
    ########################
    displayImage()

def zoomIn2Image() : # 영상 확대
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    scale = askinteger("확대", "배율")  # 짝수
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH*scale;    outW = inW*scale
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    for i in range(outH):
        for k in range(outW):
            outImage[i][k] = inImage[int(i/scale)][int(k/scale)]  # O = I
    ########################
    displayImage()

def zoomInImage() : # 영상 확대
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    scale = askinteger("확대", "배율")  # 짝수
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH*scale;    outW = inW*scale
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    for i in range(inH):
        for k in range(inW):
            outImage[i*scale][k*scale] = inImage[i][k]  # O = I
    ########################
    displayImage()

def zoomOutImage() : # 영상 축소 알고리즘
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    scale = askinteger("축소", "배율")  # 짝수
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = int(inH/scale);    outW = int(inW/scale)
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    for i in range(inH):
        for k in range(inW):
            outImage[int(i/scale)][int(k/scale)] = inImage[i][k]
    ########################
    displayImage()

def moveImage() : #영상 이동
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    dy = askinteger("","x변위:")
    dx = askinteger("", "y변위:")

    for i in range(inH):
        for k in range(inW):
            if 0<= i+dx < outH and 0<= k+dy < outW :
                outImage[i+dx][k+dy] = inImage[i][k]

    ########################
    displayImage()

def point2Image() : #범위 강조 변환
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    p1 = askinteger("","값:")
    p2 = askinteger("", "값:")
    if p1 > p2 :
        p1, p2 = p2, p1
    #     tmp = p1
    #     p1 = p2
    #     p2 = tmp

    for i in range(inH):
        for k in range(inW):
            #if p1 < inImage[i][k] and inImage[i][k] < p2 :
            if p1 < inImage[i][k] < p2 :
                outImage[i][k] = 255
            else :
                outImage[i][k] = inImage[i][k]
    ########################
    displayImage()

def bwImage() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;
    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    for i in range(inH):
        for k in range(inW):
            if inImage[i][k] < 127 :
                outImage[i][k] = 0
            else :
                outImage[i][k] = 255
    ########################
    displayImage()
def bw2Image() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;
    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    hap = 0
    for i in range(inH):
        for k in range(inW):
            hap += inImage[i][k]
    avg = hap / (inH * inW)

    for i in range(inH):
        for k in range(inW):
            if inImage[i][k] < avg:
                outImage[i][k] = 0
            else:
                outImage[i][k] = 255
    ########################
    displayImage()
def bw3Image() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;
    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    mid = 0
    tmpAry = []
    for i in range(inH):
        for k in range(inW):
            tmpAry.append(inImage[i][k])

    tmpAry.sort()
    mid = tmpAry[int((inH*inW)/2)]


    for i in range(inH):
        for k in range(inW):
            if inImage[i][k] < mid:
                outImage[i][k] = 0
            else:
                outImage[i][k] = 255
    ########################
    displayImage()

def paraCapImage() : # 파라볼라 캡 알고리즘
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    # Out = 255.0 * ( (In / 128.0 - 1.0) ** 2 )
    for i in range(inH):
        for k in range(inW):
            v = 255 - 255.0 * ( (inImage[i][k] /128.0 - 1.0) ** 2)
            if v > 255 :
                outImage[i][k] = 255
            elif v < 0 :
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(v)
    ########################
    displayImage()

def paraCupImage() : # 파라볼라 캡 알고리즘
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    # Out = 255.0 * ( (In / 128.0 - 1.0) ** 2 )
    for i in range(inH):
        for k in range(inW):
            v =  255.0 * ( (inImage[i][k] /128.0 - 1.0) ** 2)
            if v > 255 :
                outImage[i][k] = 255
            elif v < 0 :
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(v)
    ########################
    displayImage()
def equalImage() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    for i in range(inH):
        for k in range(inW):
            outImage[i][k] = inImage[i][k]  # O = I
    ########################
    displayImage()


def addImage() :  # 밝게하기 알고리즘
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None :
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage=malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    value = askinteger("밝게할 값", "값-->", minvalue=1, maxvalue=255)
    for i in range(inH) :
        for k in range(inW) :
            if inImage[i][k] + value > 255 :
                outImage[i][k] = 255
            else :
                outImage[i][k] = inImage[i][k] + value
    ########################
    displayImage()

def gammaImage() :  # 감마연산 알고리즘
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None :
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage=malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    ## Out = I ** (1/r)
    r = askfloat("감마연산", "값-->")
    for i in range(inH) :
        for k in range(inW) :
            v = inImage[i][k] ** ( 1/ r)
            if v > 255 :
                outImage[i][k] = 255
            elif v < 0 :
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(v)
    ########################
    displayImage()

def rotateImage() :
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    # xd = cos * xs - sin * ys
    # yd = sin * xs + cos * ys

    angle = askinteger("회전", "각도", minvalue=0, maxvalue=360)
    r = angle * math.pi / 180

    for i in range(inH):
        for k in range(inW):
            xs = i ; ys = k
            xd = int(math.cos(r) * xs - math.sin(r) * ys)
            yd = int(math.sin(r) * xs + math.cos(r) * ys)

            if 0<= xd < outH and 0<= yd < outW :
                outImage[xd][yd] = inImage[xs][ys]
    ########################
    displayImage()

def rotate2Image() : # 회전 - 중심, 백워딩
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    # xd = cos * xs - sin * ys
    # yd = sin * xs + cos * ys

    angle = askinteger("회전", "각도", minvalue=0, maxvalue=360)
    r = angle * math.pi / 180

    cx = inH // 2
    cy = inW // 2

    for i in range(outH):
        for k in range(outW):
            xs = i ; ys = k
            xd = int(math.cos(r) * (xs -cx) - math.sin(r) * (ys-cy) + cx)
            yd = int(math.sin(r) * (xs -cx) + math.cos(r) * (ys-cy) + cy)

            if 0<= xd < outH and 0<= yd < outW :
                outImage[xs][ys] = inImage[xd][yd]
    ########################
    displayImage()

def stretchImage() : # 히스토그램 스트래칭
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    ## Out = ( In - low ) / ( high - low ) * 255.0
    low = high = inImage[0][0]
    for i in range(inH):
        for k in range(inW):
            if low > inImage[i][k] :
                low = inImage[i][k]
            elif high < inImage[i][k] :
                high = inImage[i][k]

    for i in range(inH):
        for k in range(inW):
            out = ( inImage[i][k] - low ) / ( high - low ) * 255.0
            if out > 255 :
                outImage[i][k] = 255
            elif out < 0 :
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(out)
    ########################
    displayImage()

def endInImage() : # 엔드인 탐색
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ### 진짜 영상처리 알고리즘 ###
    ## Out = ( In - low ) / ( high - low ) * 255.0


    low = high = inImage[0][0]
    for i in range(inH):
        for k in range(inW):
            if low > inImage[i][k] :
                low = inImage[i][k]
            elif high < inImage[i][k] :
                high = inImage[i][k]
    low += 50
    high -= 50
    for i in range(inH):
        for k in range(inW):
            out = ( inImage[i][k] - low ) / ( high - low ) * 255.0
            if out > 255 :
                outImage[i][k] = 255
            elif out < 0 :
                outImage[i][k] = 0
            else :
                outImage[i][k] = int(out)
    ########################
    displayImage()

def equalizedImage() : # 히스토그램 평활화
    global window, canvas, paper, inImage, outImage, inH, inW, outH, outW, filename
    if filename == '' or filename == None:
        return
    ## (중요!) 출력이미지의 높이, 폭을 결정 ---> 알고리즘에 의존
    outH = inH;    outW = inW
    ## 출력이미지 메모리 할당
    outImage = malloc(outH, outW)
    ## 1단계 : 히스토그램 만들기
    histo = [ 0 for _ in range(256)]
    for i in range(inH):
        for k in range(inW):
            histo[inImage[i][k]] += 1
    ## 2단계 : 누적 히스토그램 만들기
    sumHisto = [ 0 for _ in range(256)]
    sumHisto[0] = histo[0]
    for i in range(1, 256) :
        sumHisto[i] = histo[i] + sumHisto[i-1]
    ## 3단계 : 정규화 히스토그램
    ## n = 누적합 * ( 1 / (inH*inW) ) * 255
    normalHisto = [0 for _ in range(256)]
    for i in range(256) :
        normalHisto[i] = sumHisto[i] * ( 1 / (inH*inW)) * 255.0

    ### 진짜 영상처리 알고리즘 ###
    for i in range(inH):
        for k in range(inW):
            outImage[i][k] = int(normalHisto[inImage[i][k]])
    ########################
    displayImage()

## 전역 변수부
window, canvas, paper = None, None, None
inImage, outImage = [], [];  inH, inW, outH, outW = [0] * 4
filename = ''

## 메인 코드부
if __name__ == '__main__' :
    window = Tk()
    window.title('그레이 영상처리 Ver 0.2')
    window.geometry('512x512')
    window.resizable(height=False, width=False)
    status = Label(window, text='이미지정보:', bd=1, relief=SUNKEN, anchor=W)
    status.pack(side=BOTTOM, fill=X)

    ### 메뉴 만들기 ###
    mainMenu = Menu(window)
    window.configure(menu=mainMenu)

    fileMenu = Menu(mainMenu)
    mainMenu.add_cascade(label="파일", menu=fileMenu)
    fileMenu.add_command(label="열기(Open)", command=openFile)
    fileMenu.add_command(label="저장(Save)", command=saveFile)
    fileMenu.add_separator()
    fileMenu.add_command(label="닫기(Close)")

    pixelMenu = Menu(mainMenu)
    mainMenu.add_cascade(label="화소점 처리", menu=pixelMenu)
    pixelMenu.add_command(label="동일영상", command=equalImage)
    pixelMenu.add_command(label="밝게하기", command=addImage)
    pixelMenu.add_command(label="감마연산", command=gammaImage)
    pixelMenu.add_command(label="파라볼라(Cup)", command=paraCupImage)
    pixelMenu.add_command(label="파라볼라(Cap)", command=paraCapImage)
    pixelMenu.add_command(label="이진화", command=bwImage)
    pixelMenu.add_command(label="이진화(평균값)", command=bw2Image)
    pixelMenu.add_command(label="이진화(중위수)", command=bw3Image)
    pixelMenu.add_command(label="범위강조 변환", command=point2Image)


    geometryMenu = Menu(mainMenu)
    mainMenu.add_cascade(label="기하학 처리", menu=geometryMenu)
    geometryMenu.add_command(label="영상 이동", command=moveImage)
    geometryMenu.add_command(label="영상 축소", command=zoomOutImage)
    geometryMenu.add_command(label="영상 확대", command=zoomInImage)
    geometryMenu.add_command(label="영상 확대(백워딩)", command=zoomIn2Image)
    geometryMenu.add_command(label="영상 회전", command=rotateImage)
    geometryMenu.add_command(label="영상 회전(중심,백워딩)", command=rotate2Image)

    areaMenu = Menu(mainMenu)
    mainMenu.add_cascade(label="화소영역 처리", menu=areaMenu)
    areaMenu.add_command(label="엠보싱", command=embossImage)
    areaMenu.add_command(label="블러링", command=blurrImage)

    histoMenu = Menu(mainMenu)
    mainMenu.add_cascade(label="히스토그램", menu=histoMenu)
    histoMenu.add_command(label="히스토그램 스트래칭", command=stretchImage)
    histoMenu.add_command(label="엔드인 탐색", command=endInImage)
    histoMenu.add_command(label="히스토그램 평활화", command=equalizedImage)

    ######################

    window.mainloop()
