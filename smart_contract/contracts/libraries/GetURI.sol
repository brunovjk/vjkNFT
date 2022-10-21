// SPDX-License-Identifier: MIT

import "base64-sol/base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity ^0.8.4;

library GetURI {
    function getURI(
        uint256[] memory _randomNumbers,
        string memory _name,
        string memory _description
    ) public pure returns (string memory uri) {
        string[20] memory colors = [
            "#E7EBDA",
            "#FFA420",
            "#18171C",
            "#587246",
            "#26252D",
            "#403A3A",
            "#CDA434",
            "#ED760E",
            "#3B3C36",
            "#C7B446",
            "#5E2129",
            "#35682D",
            "#3E5F8A",
            "#EDFF21",
            "#7FB5B5",
            "#D36E70",
            "#7E7B52",
            "#6A5F31",
            "#D36E70",
            "#47402E"
        ];
        string memory linesPath = string(
            abi.encodePacked(
                "<line stroke='",
                colors[_randomNumbers[1] % colors.length],
                " ' stroke-width='",
                Strings.toString(_randomNumbers[2]),
                "' opacity='0.",
                Strings.toString(_randomNumbers[3]),
                "' x1='",
                Strings.toString(_randomNumbers[4]),
                "' y1='",
                Strings.toString(_randomNumbers[5]),
                "' x2='",
                Strings.toString(_randomNumbers[6]),
                "' y2='",
                Strings.toString(_randomNumbers[7]),
                "' />"
            )
        );
        string memory circlesPath = string(
            abi.encodePacked(
                "<circle cx='",
                Strings.toString(_randomNumbers[8]),
                "' cy='",
                Strings.toString(_randomNumbers[9]),
                "' r='",
                Strings.toString(_randomNumbers[10] / 2),
                "' opacity='0.",
                Strings.toString(_randomNumbers[11]),
                "' fill='",
                colors[_randomNumbers[12] % colors.length],
                "'/>"
            )
        );
        string memory trianglesPath1 = string(
            abi.encodePacked(
                "<polygon fill='",
                colors[_randomNumbers[13] % colors.length],
                "' opacity='0.",
                Strings.toString(_randomNumbers[22]),
                "' points='",
                Strings.toString(_randomNumbers[14]),
                ",",
                Strings.toString(_randomNumbers[15]),
                " ",
                Strings.toString(_randomNumbers[16]),
                ","
            )
        );
        string memory trianglesPath2 = string(
            abi.encodePacked(
                Strings.toString(_randomNumbers[17]),
                " ",
                Strings.toString(_randomNumbers[18]),
                ",",
                Strings.toString(_randomNumbers[19]),
                " ",
                Strings.toString(_randomNumbers[20]),
                ",",
                Strings.toString(_randomNumbers[21]),
                "' />"
            )
        );
        string memory imageString = string(
            abi.encodePacked(
                "<svg version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' style='background-color: ",
                colors[_randomNumbers[0] % colors.length],
                " '>",
                linesPath,
                circlesPath,
                trianglesPath1,
                trianglesPath2,
                "</svg>"
            )
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                _name,
                                '","description":"',
                                _description,
                                '","external_url":"vjknft.brunovjk.com/',
                                _name,
                                '","image":"data:image/svg+xml;base64,',
                                Base64.encode(bytes(imageString)),
                                '"}'
                            )
                        )
                    )
                )
            );
    }
}
