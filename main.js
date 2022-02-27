const box = document.querySelectorAll(".box")


alert("Xếp Thành Bảng Tăng Dần");
alert("Nhấn Phím Màu Xanh Để reset");

var arrBox = Array.from(box);
var xOne, yOne;  // [xOne, yOne]
var lenBox = 16;
var arrDx = [];
var arrDs = [];
var arrTwo = [];
var soLuotNhan = 0;


function artBox(idBoxArt, xBoxArt, yBoxArt)
{
    var idString = idBoxArt.toString();
    var textId = ".a" + idString;
    const boxCss = document.querySelector(textId);
    boxCss.style.top = xBoxArt + "px";
    boxCss.style.left = yBoxArt + "px"
    document.getElementById("rs").innerText = soLuotNhan;

}

function tao()
{
    var so = Math.random() * 100;
    var soString = so.toString();
    var soString2 = soString[0] + soString[1];
    var soInt = Number(soString2);
    return(soInt);

}


for (var i = 1; i < 17; i++)
{
    arrDs.push(0);
}

for (var i = 1; i < 17; i++)
{
    arrDx.push(0);
}


function resetGame()
{
    var arrDss = [];
    var arrOne = [[150, 150]], arrArr = [];
    soLuotNhan = 0;
    for (var uOne = 0; uOne < 5; uOne++)
    {
        for (var vOne = 0; vOne < 5; vOne++)
        {
            if (uOne != 4 && vOne != 4)
            {
                xOne = uOne * 50;
                yOne = vOne * 50;
                arrArr = [xOne, yOne];
                arrOne.push(arrArr);
            }
        }
    }
    for (var iDss = 1; iDss < 17; iDss++)
    {
        arrDss.push(0);
    }

    for (var iDs = 0; iDs < 16; iDs++)
    {
        var soRand = tao();
        while (soRand > 16 || soRand < 0 || arrDss[soRand] != 0)
        {
            soRand = tao();
        }
        arrDs[iDs] = soRand;
        arrDss[soRand] = 28;
    }

    for (var iDs = 0; iDs < 16; iDs++)
    {
        arrDx[arrDs[iDs]] = arrOne[iDs+1];
    }

    var kt = 0;
    arrTwo = [ [28, 28, 28, 28, 28, 28],
               [28, 0, 0, 0, 0, 28],
               [28, 0, 0, 0, 0, 28],
               [28, 0, 0, 0, 0, 28],
               [28, 0, 0, 0, 0, 28],
               [28, 28, 28, 28, 28, 28]];
    for (var uTwo = 1; uTwo < 5; uTwo++)
    {
        for (var vTwo = 1; vTwo < 5; vTwo++)
        if (kt < 16)
        {
            arrTwo[uTwo][vTwo] = arrDs[kt];
            artBox(arrDs[kt], arrDx[arrDs[kt]][0], arrDx[arrDs[kt]][1]);
            kt++;
        }
        else
        {
            kt = 0;
            arrTwo[uTwo][vTwo] = arrDs[kt];
            artBox(arrDs[kt], arrDx[arrDs[kt]][0], arrDx[arrDs[kt]][1]);
        }
    }
}
//

var hello = 28;
if (hello == 28)
{
    resetGame();
    hello = 10;
}


function goBox(v1, v2, v3, v4, xGo, yGo, xZeroGo, yZeroGo, idBoxGo)
{
    
    arrDx[idBoxGo][0] = arrDx[idBoxGo][0] + v1 * 50;
    arrDx[idBoxGo][0] = arrDx[idBoxGo][0] + v2 * 50;
    arrDx[idBoxGo][1] = arrDx[idBoxGo][1] + v3 * 50;
    arrDx[idBoxGo][1] = arrDx[idBoxGo][1] + v4 * 50;
    artBox(idBoxGo, arrDx[idBoxGo][0], arrDx[idBoxGo][1]);
    arrTwo[xZeroGo][yZeroGo] = idBoxGo;
    arrTwo[xGo][yGo] = 0;
}

function xetWin()
{
    var ktWin = 1;
    var sumWin = 0;
    for (var uWin = 1; uWin < 5; uWin++)
    {
        for (var vWin = 1; vWin < 5; vWin++)
        {
            if (uWin*vWin < 16)
            {
                if (arrTwo[uWin][vWin] == ktWin)
                {
                    sumWin++;
                }
                ktWin++;
            }
        }
    }
    console.log(sumWin);
    if (sumWin == 15)
    {
        setTimeout(() => { 
            alert("나ㅓ고더궁");
            resetGame();
        }, 000);
    }
}

function xet()
{
    var idBox = Number(this.id);
    for (var r = 1; r < 5; r++)
    {
        for (var e = 1; e < 5; e++)
        {
            if (arrTwo[r][e] == idBox)
            {
                x = r;
                y = e;
                break;
            }
        }
    }
    var u1, u2, u3, u4;
    u1 = u2 = u3 = u4 = 0;
    if (arrTwo[x-1][y] == 0)
    {
        u1 = -1;
        xZero = x - 1;
        yZero = y;
    }
    if (arrTwo[x+1][y] == 0)
    {
        u2 = 1;
        xZero = x + 1;
        yZero = y;
    }
    if (arrTwo[x][y+1] == 0)
    {
        u3 = 1;
        xZero = x;
        yZero = y + 1;
    }
    if (arrTwo[x][y-1] == 0)
    {
        u4 = -1;
        xZero = x;
        yZero = y - 1;
    }
    if (u1 != 0 || u2 != 0 || u3 != 0 || u4 != 0)
    {
        soLuotNhan++;
        goBox(u1, u2, u3, u4, x, y, xZero, yZero, idBox);
    }
    xetWin();
}


const reset = document.querySelector(".reset");
reset.addEventListener('click', resetGame)


for (var i = 0; i < lenBox ; i++)
{
    arrBox[i].addEventListener('click', xet);
}
