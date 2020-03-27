using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learningCardApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace learningCardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LearningCardsController: ControllerBase
    {
        private readonly ILearningCardRepository _learningCardRepository;

        public LearningCardsController(ILearningCardRepository context)
        {
            _learningCardRepository = context;
        }

        [HttpGet]
        public IEnumerable<LearningCard> GetLearningCards()
        {
            return _learningCardRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IEnumerable<LearningCard> GetLearningCard(int id)
        {
            return _learningCardRepository.GetAll().Where(l => l.CardSetId == id);
        }

        [HttpPost]
        public ActionResult<LearningCard> PostFolder(LearningCard learningCard)
        {
            _learningCardRepository.Add(learningCard);
            _learningCardRepository.SaveChanges();

            return CreatedAtAction(nameof(GetLearningCard), new { id = learningCard.Id }, learningCard);
        }

        [HttpPut("{id}")]
        public IActionResult PutLearningCard(int id, LearningCard learningCard)
        {
            if (id != learningCard.Id)
            {
                return BadRequest();
            }
            _learningCardRepository.Update(learningCard);
            _learningCardRepository.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<LearningCard> DeleteLearningCard(int id)
        {
            LearningCard learningCard = _learningCardRepository.GetBy(id);
            if (learningCard == null)
            {
                return NotFound();
            }
            _learningCardRepository.Delete(learningCard);
            _learningCardRepository.SaveChanges();
            return learningCard;
        }

    }
}