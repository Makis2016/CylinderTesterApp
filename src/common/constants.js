/**
 * 常量配置
 */
export const Constants = {
    /**
     * 默认
     */
    default: {
        // 资源类型-菜单
        menu: '菜单',
        // 资源类型-子菜单
        submenu: '子菜单',
        // 资源类型-按钮
        button: '按钮',
        // 版本号
        platformVersion: 'V1.0.0'
    },

    eDeviceStatus: {
        IDLE: '未开始',
        STEWING: '静置中',
        SOT: '静置结束',
        TESTING: '测试中',
        EOT: '测试结束'
    },
    eValidityStatus: {
        EXPIRED: '已过期',
        NOEXPIRED0: '未过期',
        NOEXPIRED1: '未过期'
    },
    eTestType: {
        AUTO: '自动测试',
        STANDARD: '标准测试',
        MANUAL: '手动测试'
    },
    eMedia: {
        4: '天然气',
        5: '氮气',
        6: '氧气',
        3: '氩气'
    },
    eStatus: {
        IDLE: 'IDLE',
        STEWING: 'STEWING',
        SOT: 'SOT',
        TESTING: 'TESTING',
        EOT: 'EOT'
    },
    eTestingType: {
        AUTO: 'AUTO',
        STANDARD: 'STANDARD',
        MANUAL: 'MANUAL'
    },
    TopologicalGraph_A: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtcAAACvCAIAAAC5AmWPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB6ASURBVHhe7d1PiCNpHcbx2d1I9/S2magjhp517MZlCYoQhkGKZcAZPWyYFc1hDo3g7IgsZhDZCAPTl6WPffAQECSghwYv8SJBVmkEYdBLjo2nHOcYPEiOOen4JL/fvFZXpSpVSf15U/V8Dk3963R3deV9v53uTq69IiIiIsoDK2RNs9lsOByenJzcd+l0Oufn55PJRA8iIiKiYKyQ2F6+fPnkyZNardZut8/Ozl649Pt97KrX661WC6v6DkRERLQMKySG2WzW6XQODw/Pz8+xrFuXubi4kEdHkCy6iYiIiK5ihUQ1nU5RFf1+X9cjePHiRbPZHI1Guk5EREQurJBIXr582Wg01ugJtAtC5OLiQteJiIjoNVbIaigJx3E6nc7p6aluigz90W6379+/z0dEiIiIPFghq7VaLXkwAxUSK0QkQWaz2cuXL9Ex/N8ZIiIiN1bICsPhECWhK3FCxCSIrPZ6vW63K8tE0U2nU/6/FREVFSskDBri8PDQ8xhGlBDxJIhoNpuXl5e6QhQNrqJbt2796U9/0nUiogJhhYQZDAbHx8e64hIeIksTBPr9fqfT0RWiyH7961+/9dZbDBEiKh5WSBgkCEJEV64KCpGgBIHJZFKv13WFKI6jo6M333yTIUJEBcMKCYSSQDRMp1Nd9/GHSEiCCMdx+M8ytIbhcHjt2rW33nqLv9QjoiJhhQR6+fLl4eGhrgRwh8jKBIEnT56cn5/rClEcSFiEyPXr1xkiRFQYrJBAL168uH//vq4EkxCJkiAgB+sKURyID1QIfPnLX2aIEFExsEICnZ+fP3nyRFdC4bBGo7EyQSD6bRL5ffDBB2+++aaECF+iiIgKgBUS6OLiotVq6UoweRTk5OQkyoMcZ2dnOFJXiGKaTCbValUeETk8PGSIENG2Y4UEGo/HjUZDVwK4fxET5bctnU4n1uvhEXl8/PHHlUpFHg7h72WIaNuxQgJNp9N6vR7yexb/34KsDBHzZPBE65HL8s6dO1H+aInWhvs1zrM87BSOz4lMtAlWSBgM9EFPnu1PEBESIji4VquFZA1RFPKLmJArjVLC/3EjShwrJEzQs50GJYgImh6CnomVaD0hlUxpYIUQJY4VEmYymRweHnpqIzxBxNIQwXsNh0NdIYog/O9PcX02m03P6xxtYjwe6xItwwohShwrZAXPf7VESRDhCRG8Y5T/uCEyBoPBtWvXMPOFtEhS1xUmVwQ36DotwwohShwrZA5jvS75IDgajYZMA9ETRJgQwbs4jsP/aKBYMOHJtIc4CGmRbrfb6/V0JT5z+y9evGCFhGOFECWuRBWy+Ht2pZsW/Fs8xuNxs9kcDoexEkRIiPAfdGkNUiFmOahFcE3ev39/jdcn8twm3pa2QlBgUX5IiFghOCYoGYnIo1yPhZja8GRHeIUAEqRWq633C3jHcfiC/rQGd4WIoBbBKkI55JUXPZbeTpkrBBlXr9fxY0Z4i6ysEDmxuKnww4jIYIXMrawQuLi4QE/E+vM9zAoY1+SXMkRxYSbzVIhY2hAR/wNr6fuKklfIixcv8MMGYi6kRUIqxH1iQw4jIo/SVYjQ9df8W5aSZ1NdOoJ7oD8QHxiV+E8xtDbMZLjYdMXH3xPhk5//eA9WiCyHtMjSMxz3G0FEbqWrEF26KmKFCBl0MGz1ej3PL+ORKdiLH0nr9ToqJPoj5ER+uJYwn+lKAPcUOJvNMH36H65zH6OblmGF6MrC0hbx5EXQifUcRkQhWCFzsSpEYMzqdruO4+B9DXmkZDAYxP0jViI/zGS4nHQllJkO//a3v2HuNJdf0DS5FCtEV1w8LWLyIvzEmsOIaKUSVYiWgi84dGv8EDEw4mDc0RWihMS9rmRqvHfv3qNHj8KnyaVYIbriY1oEhx0fH688sawQouhKVCHpYYXYZjqd7u3taV1uM/SEfkmRYaaU9w2ZVpfCtLq/vy/vWzZf+tKXVp4uVIgcvPKPvRCCcmSI0gYfkQcrJAGsENsU48f6uNeVefzjn//85+3bt9955x0s87GQKMIfCzEnFqco5G9XDRyJd9GVAAgRXSIqN94TEsAKsU3ZKsQ9TcqW0WiEmfW3v/2tZ3sIVoiuuPhPrAhvERzPCiGKiPeEBLBCbFOeCgmaJqHX63W7XSyEHOPGCtGVhSgnLahF8F54d10JwAohErwnJCDKbEFZKkOFRJkm3ZPryuNZIbIc5cS6+VsE74sbkeUgrBAiwXtCAsJnC8pesSsk+jTpf+n/kPdlhUQ/sX7uFsEt4KZ0RwBWCJHgPSEBQbMF5aWoFbLGNInJFVOsrry29HZKXiG1Wi3WiV1KWgQ3xQohioj3hASwQmxTvApZoz+M+cs6L3sxI89tlrlC0Gob9ocbWmTl8yazQogE7wkJYIXYpkgVskl/GI7jBL30v7l9zMSlrZDssUKIBO8JCWCF2KYYFTIYDDBXbdgfArfQDH3pf2kRVkhmWCFEgveEBLBCbFOMCoHN+8MYDoftdltXAvhfCY9SwgohErwnJIAVYpvCVEiyut1ur9fTFcoVK4RI8J6QAFaIbVghS81mM8dxQp56nDLDCiESvCckgBViG1ZIkPF43HS99D/lhRVCJHhPSAArxDaskBC8XG3ACiESvCckgMO6bVghZDlWCJHgPSEBrBDbsEKi4ESYI558IsF7QgJYIbZhhRiY7dx06+vt//3vf3WdkiZnWBZki9vSjUQlxHtCAlghtmGFuJkJzzPzYfXf//63rpSPnA28FbIRzLJ7o+HfOH9n1025NwpZle2GfwtROfGekABWiG1YIW4hE+G//vWv4XCo6yWDL99Nt74WslGYLZ4FsThkvkUWQLYb/i1E5cR7QgJYIbZhhbjJLAi6/hq2/Oc//2k2mzhduqlklp4T91tZMGSL8G8B2Qi6viCrst3wbyEqpyLcE6bTqbxq6No++eSTn/3sZ7oS3w9/+EMM5bqyLnwC+DR0ZV0rX8mzJFghbuET4dKX/i88fO0eusN1otzbZcGz6lkwy2BWZQFku+HfQlRORbgnyGuB6jy8lg8++ODrX/+6rsSXSIXgFnA7urIW3ML5+bmelHJjhbgFTXhmu1w/slwqIXEgC/5Vw73dLLhX3VvkrZt/C1E5FeGesPkPc48fPz44ONCV+Gaz2WQy0ZV1PVm8hruurGXzWygMVogxnwwXdP013fp6O+5EslAq5ss35JwIWZXtsHR5ftxVnu1mWbYb/i1E5VSEe8LmFeI4TqVS0ZWcsEISxAqhKIJSQLbP2+H1Ae5lkGX3Fg/PLv+RIe9LVCpFuCdsXiEHBwcYFDZ/PGMTrJAEsULIcqwQIsEKmatUKtVqNd8HpVkhCWKFkOVYIWSbP/zhD7qULVbIfMbaX8h3CmeFJIgVQpZjhZBVMHccHR3l8lfqrJD5u9dqNQwKz5490015YIUkiBVClmOFkD0wcWD6wEIu/y7HCpl/A/b39zEoPHz4UDflgRWSIFYIWY4VQpYwCSKyDxFWyKtnz55hRIBGo6Gb8sAKSRArhCzHCiEbeBJEZBwirJBXDx8+lAq5fv26bsoDKyRBrBCyHCuEcrc0QUSWIcIKedVoNKRCdnZ2cnwGdFZIglghZDlWCOUrJEFEZiHCCnlVrValQm7cuHF5ealbM8cKSRArhCzHCqEcrUwQkU2IlL1CptPpzs6OVAhyZDAY6I7MsUISxAohy7FCKC+YJnD5YdL0aDabuuSyu7ubdoiUvUIuLy9v3LixiJBrlUrl7OxMd2SOFZIgVghZDgOOLhFlC8MjJk0/XJO6dNV4PNb3TEfZK2Q4HJoKgcePH+uOzLFCEsQKIcthtNElovwMBoPZbCbL7msyy6mk7BXS6/XMb2TAcRzdkTlWSIJYIWQ5jDa6RJSfdruNH8Vl2VyTl5eXzWZTljNQ9gp5/PjxIj/UzZs3dUfmWCEJYoWQ5TDa6BJRfvr9fqfTkWVzTZ6dnZ2cnMhyBspeIY7jLPLj/3RH5lghCWKFkOVyHGqIDPdQaa5JzKeYVWU5A2WvEHlNf6Narab9lzhBWCEJYoWQ5TDa6BJRrjBUYsDEglyTs9msVquZPxbJQNkrpFKpLPJD4exfXFzovmyxQhLECiHLYbTRJaJcdbvdXq+HBbkmh8Nhu91e7MlIqSsEc5W8jp2xt7fX7/d1d7ZYIQlihZDlMNroElGuBoPB8fExFuSaPDk5yfgZK0pdIXhHeU1/t6dPn+rubLFCEsQKIcthqNElolyZCVSuyeznkVJXCM6157EQePDgge7OFiskQawQshyGGl0iytV4PJbXk5drstVqZfxnCaWuEPOa/m5HR0e6O1uskASxQshyGGp0iShX0+m0VqthQa7JZrOZ8euplbpCzGv6u1UqFd2dLVZIglghZDkMNbpElDe5GuUtRk6Mn4vNGSl1hZjX9Hfb2dmZTCZ6RIZYIQlihZDlMNToElHepDzkmsz+yix1hfziF79oLty+ffuLX/yiLH/ve9/L8l+lDVZIglghZDlWCNljd3cXs55ck/V6PeOfw0tdIQYmb0zhupITVkiCWCFkOVYIWQL9gQrBglyTjUYj46fuZIXMsUIKhhVClmOFkCXMaCnXJCZTTKmLPRlhhcyxQgqGFUKWY4VkDGNCv98/PT1tt9uYLzBaYnkwGEynUz2irMwEKtdk9vMIK2SOFVIwrBCyHCskM4iPZrOJAaHT6aA8hsMhpgwMlVg+Pj6u1Wrokox/+reKecp2uSbNE7pnhhUyxwopGFYIWY4VkgHMrxIf4U+AgcMwg0BeL2WaL9QYYEGuyexnQ1bIHCukYFghZDlWSNrOzs7wIz6GAl1fBfOI4zgoEl0vDXzVo9EIC3JNTiaTer2+2JMRVsgcK6RgWCFkOVZIqjAYnpyc6Epk0+kU4VKqUdQ8cSqYa7KZ7dOnrn9PwCeK73T00kwPK0SkUSG4TZxbnGFd3xKsELLctleI/MR8enpq4V93oj9arVan09H1yPC1YLiDtB8RQetAxk+UvpR5QV0w12TGL6u7/j0Bozw+UbzNvUVYISKNCsGJxUCzuGNuU4uwQshy214huItJheCOZlWLmMEcn1W3243+FJToKoxyKAO8i+M4qSYCPhBmevwkn3uLuGcNc01uPqXGslGFSHzga8i3RVghYvNb8DPxISfZrFqOFUKWK0CFyF0M/WFPi6Ak8JmY8uj1ehiyokzzGDkbjYY5EgtIBFlOgxlIh8Nhvi2CGDLPlGquSZzANR5JWlsCFSJybBFWiEi1QsS2tAgrhCxXmAoRlrSI/79MR6MRpvlWq4X53v+4CCbgfr+P/sDg6fm0UQbp/V7GM4Tm3iIir2sysQoRubQIK0RkUCHC/hZhhZDlClYhIt8WwUes1+tLfwVzcXGBOX53d9dxHBm7AAcDfuhf+g+6yBccrCtJw0f3D565t0hBKkRk3CKsEJFZhQibW4QVQpYrZIWIvFokyjCOtsB4JcxvIoKEzHEbChk2c2yRQlWIyKxF8O3EN1VX1sIKCbIyMuTkrzwsY6wQslyBK0Rk3yLHx8eDwUBXktDpdPr9vq4kauWAmX2L4PPBNXlxcbH0waRUpVghIoMWkYlQV9bCCgkSMS/kWxDx4AywQshyha8QkWWLRJySoktvXog4VGbTIpPJxHEcXJCi0WikN1kvlXqFiFRbhBUicqwQYU+LRBwiifKC4V6XtlOsu1g2LZL4Kd18ZgkSa5BMu0WOj48X+fF/KX3VQbzfNlwl82kkgi984QtxkwJzJL7C9957T28iIfgO3b17Vz/GWopRId/97neRsXpSEvLOO+/ETQocf3BwcPv2bb2JRN28ebMWQbVaffvtt/UTIrLP7u6uXtOWiTiG4Kfnr3zlK/rFRIP++PnPf379+vU7d+7orYTCYRGPhPfff39/f18/UkLG4/HnP/95/QARfPOb37x3756uhFpjXEWL4Av86le/ivkuio8++ggfYqW//vWvUh4en332mR6RNP/fAnsrBGGhx65y69atWBWCKRZn8MMPP/zjH/+oN5GQXq+H771+mLUUo0J+9KMfPX/+XE9KQpB3eKsfIAIcjO8F3us3v/nN4gYS9rvf/Q7f7pU+/fTTerYvhUAUC8ZivaYt85e//EWXQg0GA4zn+sVEgATBvRKz709+8hPMfHoroXBYxCMBR+7s7OgHS8hoNPrWt76lHyCCP//5z7q0StxxFQny7rvvYs5FI2plrOL+b6AQqDftjqvwGeoRSfM/E0kWv5HB5Jrer2MA3058bbqylmJUyOa34IcTG/HeIt+F6MenClcafyNDNst9wNlQ9LtYNr+OgVqtluztY+5vL17yPnHRx8kM/jQEP7Bpery2u7ur+zKRboWk3R+CFSLyqhCr+kOwQshyGOt1aTtFuYtl1h8Cs3WyU3Wv1+t2u7qSqCijZQb9IQaDgcSHkdJ/BgVJq0Ky6Q/BChHZV4iF/SFYIWQ5jPW6tJ3C72IZ94fAxwJdSUJ6I1v4LWfWH8ZoNGq1WvV6HZ/YxcWFbs1K8hWSZX8ImQt1ZS2skCBB9xY550F7c8cKIcsVtUJy6Q8R/mynmNHxKWFql4ELjo+P8UN/0DyFTx6zckpPnoGPvnTkzL4/bJBkhWTfH4IVIrKpEMv7Q7BCyHLFq5Ac+8NY+ksZTO34rLALnxiWMXCJwWDQ6XSwC7M+VvXo19L7dQz4x89y9odIpkLy6g+Bbye+qbqyFlZIEPe9Rc6ze4u1WCFkuSJViA39ITCXYyLXlcUn1mq1sCV8YsJ7YVhDc5hHPrCAL2flU7yvzT2KZt8f7msv6DrM8vrctELy7Q/BChHpVYicYVnWHXZjhZDlilEh9vSH4TjOaDTCAj4fDFnR/8qh1+shBSREzs7OTk5OZHsaZCzN6/EPT4X4L0XZ6KH7UrBRhdTr9Xz7Q8gcqStrYYUEwYnFN3qL+kOwQshyqQ7rGcBdbHd316r+EPhk5PcyGLXizu7y0ruIg1arpZvSgc8Ns2f2/QGSFEvpEVtUIZjwcu8PwQoRaVQIzu129YdghZDNCnB9zmazfr9vVX8Y4/G4VqshJnQ9jrOzM0RM2l8XPrfs+8NwJ4W/MDyrGcj646WBFSLSqJAtxQohm/H6TBvmeMdx4s706CpMJXamVYKkPPxk19JjZGNKWCFzrJCC4ShPNuP1mYHJZNJsNjEq4mzrpmAyiXQ6nZT+NdcenqrwrC618oANsULmWCEFw1GebMbrMzMYEhuNRrvdxoL/f17G43Gv10OsYAbZxl89r8dUxaJA/k82+oXsSgQrZI4VUjAc5clmvD6zNJvNhsMhhkd5wRRpDpx/LCNQut1ujn+ikQt3VWDZvbrUygM2xAqZY4UUDEd5shmvzxyhOTBl4Fug6+XjropFhKzOgCjHrI0VMscKKRiO8mQzXp+Uo/WSIr0QYYXM5VghEubQarVOTk5keTwe6+44WCEGR3myGa9PIoMVMpdjhSAwa1dVq9W9vT3dHQcrxOAoTzbj9UlksELmcqwQNAdCxOPg4EB3x8EKMTjKk814fRIZrJC5HCuk0Whoerg8ePBAd8fBCjE4ypPNeH1mAAOpLrnIAOuh+3zv4lmllLBC5nKskEePHi3uCFc8ffpUd8fBCjE4ypPNeH2mBIOnWXCTjaDrV+m+q4K2U+JYIXM5Vsjp6ancE4ydnZ1er6e742CFGBzlyWa8PlOC8VOXAjJiMcR66b6rgrZT4lghczlWCD70/v6+3BlErVaL/mrUbqwQg6M82YzXZ+IwcroXPKsCy36y3exdHOg9UjZSSopwfre6QkajEbJDL/aFarXK/9TdEEf53PX7/cK/JMfaeH2mAYOnvHWTXYZuvXqk7IKgZUpVEU70VlfIZDLZ29tb3BdUpVJZb/hmhRgc5XP3/Pnz999/nyGy1OZDFi2F8dPz1mM+wvrovqvv4l6mVBXhRG91hQCyY3FfUDdv3tQdMbFCDFZI7tAf1Wr17t27DBE/VkhKMH4ufWtg1U/3XT3YvUypKsKJ3vYKOTg4WNwXVLPZ1B0xsUIMVogNfvWrX+F6Zoj4sULSgIvNveB+67d0Ozaa7UsPoDQU4URve4U8ePBArn7x+PFj3RETK8RghdgA8fG1r30Nl/QPfvAD3UQLrJA04EpzL7jfumGLh+64erB7mVJVhBO97RXy9OnTxX1hrlKpnJ2d6Y6YWCEGK8QSw+EQV/Ubb7zBEHFjhaRBhlAwq0s3LiV7KReskLl8K6TX6+3s7MidoVqtDgYD3RETK8Rghdjj6OgIF/bnPvc5hojBCiEyWCFz+VYIfl68ceOGVEitVhuNRrojJlaIwQqxB67nt99+G9c23q73pMDFwwohMlghc/lWyHg8Nq9pt7OzM51OdUdMrBCDFWIV85dPiOxPPvlEt5YYK4TIYIXM5Vshs9nM/LPu9evXdWt8rBCDFWKVy8tLebQPl/fvf/973VpirBAigxUyl2+FgHks5OjoSDfFxwoxWCG2+fjjj9977z3HcXBv1U0lxgohMlghc7lXiHl9/4cPH+qm+FghBivENrOFyWSCS33t3zkWBiuEyGCFzOVeIeb1/Z89e6ab4mOFGKwQaw2Hw3a7rStlxQohMlghc7lXiLy+/97eXr/f103xsUKMfCsEP/Sv/e/WBYDOCH+0o9vt9no9XdnYxcUFTriubAlWCJHBCpnLvULwCezv79dqNXwtuik+VoiRb4Xgm4hvJT6Bcn470NP42hHWQS2CaMAddu3/SDeQO81mc3d3d5N7TS5YIUQGK2Qu9wqR1/dHiGD61E3xsUKM3CsEFyQ+B3xHStgiqBD0ByokpEXG4zECYu3HMKQ/2u325eUlTjUrhGh7sULmcq8QeX3/SqWi62thhRg2VIgsl7BFUCGyEN4i693p3P0hW7axQnIfcIjswQqZs2FQQIIcHBzoylpYIYY9FSJK1SKmQkRIi8S6Yv39IVghRFuNFTJnw6CABHEcR1fWwgoxbKsQUZIW8VSIWNois9kMYTEej2U1SFB/CFYI0VZjhczZMCg8ePBg7df0F6wQw84KEYVvkaUVIvwtMhqNcK6C/kAkvD8EK4RoqxWhQjBCYeAj2LrhOCU2V4gocIvgOtSlAJ4W6fV63W5X970WpT8EK4RoqxWhQog87K8QUcgWWVkhwt0iH374IbJDtkfvD8EKIdpqrBAqIMzu9Xodk5PHP/7xD11KE364v3fvnn4qEeCz/fGPf3zr1q3nz5/rTazy97//XZfsE7FCBFrk008/PTg4uHHjxi9/+ctGo/H9738/Yn8InGqccP3YWwLfaHzH9QsgKjdWCBUQ5rZWq4Wfkj3effddTFq6khr8KH/37l39VCI7XTx/Lt5XbyXUN77xjW9/+9u6YplYFSLOz88rlcobb7zx6NEjfO90azQ41RFPmj3u3Lnz05/+VL8AonJjhRAlDD/sYqbRlQgwBx8eHj558uTlBs9ZZ49YFeL+/cvz58+/853vmL8X0SNWwanGCdcVIto2rBCihEWvkIL1h4hYIUv//gPn7bPPPjN/LxKlRVghRFuNFRIG46mQZc8Ws9GQ1aC9YulGKpIoFVLI/hArr/CQvz+dTCbYhbfoj4gtwgoh2mqcEcN4esKzKoKOEVg13KuylwopvEIK3B8i5PKO8v8vOAYHyHKUFmGFEG01TodhzHgqC55V4d5oyBaPoO1UMEEVUvj+EEuv8yj9YXhe+j+8RVghRFuN82IYM57KgmdVFmRZFtzce90HyCoVmL9CStIfwnORx+oPsfSl/4NahBVCtNU4KYYx46kseFaFe5f/ALPdTXZRUbkrpFT9IcwVvkZ/GDhdjUbD/8zu/hZhhRBtNc6IYWQ8NaOqfwHMMR6evbIK7mUqJKmQEvaHwBW+SX8YOIE4e7pylbtF8IFYIUTbizNiGE9DYMGQLSDL7rf+Bbx1k11UVJh68V0uYX+I3d3dDfvDwDlEi+iKj7RIrVbz/O6GiLYIZ8QwQdHg3ijL7rf+Bbx1k11UYO4/XCibBL/2KC/9H/R6vES0FTgjhtFqWMYcYN4a/r1mC7iXiSjc5eWl4zhMDaKi4owYJqgY/NvnoXGV7ljQTS66g4hWWfrS/0RUDJwOich27XZ7+Pql/4moSFghRGS76XTabDbL+de+RMXGCiGiLeB+FhYiKgxWCBFZyvNHVKcLukJEhcAKIaL8SXAYssXskgXgM6USFQwrhIis4MmOpRViXvpf14loy7FCiMgKnvgwPFuGrpf+J6JtxwohIiugNoSuL3hWheel/4loe7FCiMgKEhzu7FiaILD0pf+JaBuxQojIClEeBTGCXvqfiLYLK4SI8ofmELru2gK66So+iRlRAbBCiIiIKB+sECIiIsoHK4SIiIjywQohIiKifLBCiIiIKB+sECIiIsoHK4SIiIjywQohIiKiPLx69T+EEqicO96dugAAAABJRU5ErkJggg==', // 拓扑图 常压
    TopologicalGraph_B: 'data:image/png;base64,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' // 拓扑图 承压
};